#!/usr/bin/python
#
# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


import json

from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import APIException
from rest_framework.response import Response

from store.logging import setup_logging
from store.models import Product, SiteConfig, Testimonial, Transaction
from store.serializers import (
    CartSerializer,
    CheckoutSerializer,
    ProductSerializer,
    SiteConfigSerializer,
    TestimonialSerializer,
)

logger = setup_logging()


class ProductPurchaseException(APIException):
    status_code = 405
    default_detail = {
        "code": status_code,
        "message": "Unable to complete purchase - no inventory",
    }


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=["get", "post"])
    def purchase(self, request, pk):
        product = get_object_or_404(Product, id=pk)
        if product.inventory_count > 0:
            product.inventory_count -= 1
            product.save()
            Transaction.objects.create(
                datetime=timezone.now(), product_id=product, unit_price=product.price
            )
        else:
            # Log error, which can be alerted on using log-based alerting
            logger.log_struct(
                {
                    "error": "INVENTORY_COUNT_ERROR",
                    "message": "A purchase was attempted where there was insufficient inventory to fulfil the order.",
                    "method": "ProductViewSet.purchase()",
                    "product": product.id,
                    "countRequested": 1,
                    "countFulfilled": product.inventory_count,
                },
                severity="ERROR",
            )

            raise ProductPurchaseException()

        # If the transaction caused a product to sell out, log an error
        if product.inventory_count == 0:
            logger.log_struct(
                {
                    "error": "INVENTORY_SOLDOUT_ERROR",
                    "message": "A purchase just caused a product to sell out. More inventory will be required.",
                    "method": "ProductViewSet.purchase()",
                    "product": product.id,
                    "countRequested": 1,
                    "countFulfilled": product.inventory_count,
                },
                severity="ERROR",
            )

        serializer = ProductSerializer(product)
        return Response(serializer.data)


class ActiveProductViewSet(viewsets.ViewSet):
    @extend_schema(request=None, responses=ProductSerializer)
    def list(self, request, formatting=None):
        active_product = get_object_or_404(Product, active=True)
        serializer = ProductSerializer(active_product, context={"request": request})
        return Response(serializer.data)


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.order_by("-rating").all()
    serializer_class = TestimonialSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["product_id"]


class SiteConfigViewSet(viewsets.ModelViewSet):
    queryset = SiteConfig.objects.all()
    serializer_class = SiteConfigSerializer


class ActiveSiteConfigViewSet(viewsets.ViewSet):
    @extend_schema(responses=SiteConfigSerializer)
    def list(self, request, formatting=None):
        active = get_object_or_404(SiteConfig, active=True)
        serializer = SiteConfigSerializer(active)
        return Response(serializer.data)


@ensure_csrf_cookie
@require_http_methods(["POST"])
def checkout(request):
    def lift_item_status(data):
        status = ""
        for item in data["items"]:
            if "status" in item:
                for i in item["status"]:
                    status = str(i)

        return status

    serializer = CartSerializer(data=json.loads(request.body))

    if not serializer.is_valid():
        status_code = 400
        status = "validation_error"
        if "payment" in serializer.errors:
            status_code = 501
            status = serializer.errors["payment"]["method"][0].code
        if "items" in serializer.errors:
            status = lift_item_status(serializer.errors)
        return JsonResponse(
            {"status": status, "errors": serializer.errors}, status=status_code
        )

    cart = serializer.validated_data

    items = []
    for item in cart["items"]:
        product = get_object_or_404(Product, id=item["id"])
        count = item["countRequested"]

        product.inventory_count -= count
        product.save()
        for _ in range(count):
            Transaction.objects.create(
                datetime=timezone.now(), product_id=product, unit_price=product.price
            )
        items.append(
            {"id": product.id, "countRequested": count, "countFulfilled": count}
        )

    response = CheckoutSerializer(data={"status": "complete", "items": items})
    response.is_valid()
    return JsonResponse(response.data)


def csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})
