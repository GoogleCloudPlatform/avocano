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

import pytest
from django.contrib.auth.models import User
from django.test import TransactionTestCase
from model_bakery import baker
from rest_framework.test import APIClient, APIRequestFactory

client = APIClient()

from store.serializers import ProductSerializer

factory = APIRequestFactory()


from decimal import Decimal

from rest_framework.reverse import reverse


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return json.JSONEncoder.default(self, obj)


class AvocanoUnitTest(TransactionTestCase):
    def test_basic_post(self):
        obj = baker.prepare("store.Product")
        payload = ProductSerializer(obj).data

        user = User.objects.create_superuser(username="test", password="test")
        client.force_login(user)

        response = client.post(
            reverse("product-list"),
            json.dumps(payload, cls=DecimalEncoder),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        new_data = response.json()

        breakpoint()
        # TODO(glasnt) test
        # print(reverse("product-purchase"))
        # url = reverse("product-purchase")
        # response = client.post(url, {"id": new_data["id"]},  format="json" )
        # breakpoint()
