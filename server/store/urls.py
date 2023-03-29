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


from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter

from store import views

router = DefaultRouter()

router.get_api_root_view().cls.__name__ = "Avocano Server"
router.get_api_root_view().cls.__doc__ = (
    "This is the Django REST Framework API, serving all endpoints."
)

router.register(r"products", views.ProductViewSet, basename="product")
router.register(
    r"active/product", views.ActiveProductViewSet, basename="active_product"
)
router.register(r"testimonials", views.TestimonialViewSet, basename="testimonial")
router.register(r"site_config", views.SiteConfigViewSet, basename="site_config")
router.register(
    r"active/site_config", views.ActiveSiteConfigViewSet, basename="active_siteconfig"
)

urlpatterns = [
    path("", include(router.urls)),
    path("checkout", views.checkout, name="checkout"),
    path("csrf_token", views.csrf_token, name="csrf_token"),
    path("api-auth/", include("rest_framework.urls")),
]
