#!/usr/bin/python
#
# Copyright 2023 Google LLC
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

import httpx

httpclient = httpx.Client(timeout=15, follow_redirects=True)

# Basic tests

def test_server_exists(cloudrun_service, service_name):
    assert cloudrun_service is not None
    assert cloudrun_service.name.split("/")[-1] == service_name


def test_server_index(cloudrun_url):
    response = httpclient.get(cloudrun_url)
    assert response.status_code == 200
    assert "✨🥑✨" in response.text


def test_server_admin(cloudrun_url):
    response = httpclient.get(cloudrun_url + "/admin", follow_redirects=True)
    assert response.status_code == 200
    assert "Django administration" in response.text

# Validate secrets and csrf for admin login

def test_server_admin_csrf(cloudrun_url, django_admin_user, django_admin_password):
    with httpx.Client(
        headers={"Referer": cloudrun_url}, follow_redirects=True, timeout=30
    ) as client:
        login_url = cloudrun_url + "/admin/login/?next=/admin/"

        client.get(login_url)  # for cookies
        response = client.post(
            login_url,
            data={
                "username": django_admin_user,
                "password": django_admin_password,
                "csrfmiddlewaretoken": client.cookies["csrftoken"],
            },
        )

        assert not response.is_error
        assert "Site administration" in response.text

# Basic API tests

def test_server_api_content(cloudrun_url):
    response = httpclient.get(cloudrun_url + "/api/")
    assert response.status_code == 200
    assert response.json() is not None

    base_json = response.json()

    for endpoint in [ 
        "products",
        "active/product",
        "testimonials",
        "site_config",
        "active/site_config",
    ]:
        endpoint_url = base_json[endpoint]
        response = httpclient.get(endpoint_url)
        assert len(response.json()) > 0

# Buy Now functionality tests

def test_buynow_purchase(cloudrun_url): 

    active_url = cloudrun_url + "/api/products/1/"

    response = httpx.get(active_url)
    assert response.status_code == 200

    current_count = response.json()["inventory_count"]

    response = httpx.post(
        active_url + "purchase/", 
        data = { "product": "1" }
    )
    assert response.status_code == 200
    
    new_count = response.json()["inventory_count"]

    assert new_count== current_count - 1


# Cart functionality tests

def post_client(post_url, data):
    """Helper for other post calls to all use the same call pattern"""
    client = httpx.Client(
        headers={"Referer": post_url}, follow_redirects=True, timeout=30
    )
    response = client.get(post_url)  # for cookies

    csrf_token = response.cookies["csrftoken"]
    response = client.post(post_url, headers={"X-CSRFToken": csrf_token}, json=data)
    return response


def test_cart_invalid_payment(checkout_url):
    response = post_client(
        checkout_url,
        data={
            "payment": {"method": "credit"},
            "customer": {"email": "foo@bar.com"},
            "items": [{"id": 1, "countRequested": 1}],
        },
    )

    assert response.status_code == 501


def test_cart_invalid_email(checkout_url):
    response = post_client(
        checkout_url,
        data={
            "payment": {"method": "collect"},
            "customer": {"email": "foo"},
            "items": [{"id": 1, "countRequested": 1}],
        },
    )
    assert response.status_code == 400


def test_cart_insufficient_inventory(checkout_url):
    response = post_client(
        checkout_url,
        data={
            "payment": {"method": "collect"},
            "customer": {"email": "foo"},
            "items": [{"id": 1, "countRequested": 999999}],
        },
    )
    assert response.status_code == 400


def test_cart_invalid_inventory(checkout_url):
    response = post_client(
        checkout_url,
        data={
            "payment": {"method": "collect"},
            "customer": {"email": "foo"},
            "items": [{"id": "abc", "countRequested": 1}],
        },
    )
    assert response.status_code == 400


def test_cart_successful_purchase(checkout_url):
    response = post_client(
        checkout_url,
        data={
            "payment": {"method": "collect"},
            "customer": {"email": "foo@bar.com"},
            "items": [{"id": 1, "countRequested": 1}],
        },
    )

    assert response.status_code == 200
