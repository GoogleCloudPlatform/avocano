import httpx

httpclient = httpx.Client(timeout=15, follow_redirects=True)


def test_server_exists(cloudrun_service, service_name):
    assert cloudrun_service is not None
    assert cloudrun_service["metadata"]["name"] == service_name


def test_server_index(cloudrun_url):
    response = httpclient.get(cloudrun_url)
    assert response.status_code == 200
    assert "✨🥑✨" in response.text


def test_server_admin(cloudrun_url):
    response = httpclient.get(cloudrun_url + "/admin", follow_redirects=True)
    assert response.status_code == 200
    assert "Django administration" in response.text


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



