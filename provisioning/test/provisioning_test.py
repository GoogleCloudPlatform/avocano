import os

import google.auth
import httpx
import pytest
from google.cloud import secretmanager
from googleapiclient.discovery import build

# defaults
SERVICE_NAME = "server"
REGION = "us-central1"
DJANGO_ADMIN_USER = "admin"
DJANGO_ADMIN_SECRET_NAME = "django_admin_password"

PROJECT_ID = os.environ.get("CI_PROJECT")
if not PROJECT_ID:
    _, PROJECT_ID = google.auth.default()

print("PROJECT", PROJECT_ID)

httpclient = httpx.Client(timeout=15, follow_redirects=True)


@pytest.fixture
def cloudrun_service():
    run_api = build("run", "v1")
    service_fqn = f"projects/{PROJECT_ID}/locations/{REGION}/services/{SERVICE_NAME}"
    return run_api.projects().locations().services().get(name=service_fqn).execute()


@pytest.fixture
def cloudrun_url(cloudrun_service):
    return cloudrun_service["status"]["address"]["url"]


@pytest.fixture
def django_admin_password():
    secret_client = secretmanager.SecretManagerServiceClient()

    secret_fqn = (
        f"projects/{PROJECT_ID}/secrets/{DJANGO_ADMIN_SECRET_NAME}/versions/latest"
    )
    payload = secret_client.access_secret_version(name=secret_fqn).payload
    return payload.data.decode("UTF-8")


@pytest.fixture
def firebase_url():
    return f"https://{PROJECT_ID}.web.app"


def test_server_exists(cloudrun_service):
    assert cloudrun_service is not None
    assert cloudrun_service["metadata"]["name"] == SERVICE_NAME


def test_server_index(cloudrun_url):
    response = httpclient.get(cloudrun_url)
    assert response.status_code == 200
    assert "✨🥑✨" in response.text


def test_server_admin(cloudrun_url):
    response = httpclient.get(cloudrun_url + "/admin", follow_redirects=True)
    assert response.status_code == 200
    assert "Django administration" in response.text


def test_server_admin_csrf(cloudrun_url, django_admin_password):
    with httpx.Client(
        headers={"Referer": cloudrun_url}, follow_redirects=True, timeout=30
    ) as client:
        login_url = cloudrun_url + "/admin/login/?next=/admin/"

        client.get(login_url)  # for cookies
        response = client.post(
            login_url,
            data={
                "username": DJANGO_ADMIN_USER,
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


def test_client(firebase_url):
    response = httpclient.get(firebase_url)

    assert response.status_code == 200
    assert "🥑" in response.text

    # TODO: more tests (currently limited by interactive JS)
