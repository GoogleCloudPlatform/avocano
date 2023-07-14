import pytest
import os
import google.auth
from google.cloud import secretmanager
from google.cloud import run_v2


@pytest.fixture()
def service_name():
    return "server"  # from provisioning/terraform/variables.tf


@pytest.fixture()
def django_admin_user():
    return "admin"  # from server/store/migrations/0001_create_superuser.py


@pytest.fixture()
def django_admin_secret_name():
    return "django_admin_password"  # from provisioning/terraform/secrets.tf


@pytest.fixture
def project_id():
    project = os.environ.get("CI_PROJECT")
    if not project:
        _, project = google.auth.default()
    return project


@pytest.fixture
def region():
    return os.environ.get("REGION", "us-central1")


@pytest.fixture
def firebase_url(project_id):
    return f"https://{project_id}.web.app"


@pytest.fixture
def cloudrun_service(project_id, region, service_name):
    client = run_v2.ServicesClient()
    service_fqn = f"projects/{project_id}/locations/{region}/services/{service_name}"
    request = run_v2.GetServiceRequest(name=service_fqn)
    return client.get_service(request=request)


@pytest.fixture
def cloudrun_url(cloudrun_service):
    return cloudrun_service.uri


@pytest.fixture
def django_admin_password(project_id, django_admin_secret_name):
    secret_client = secretmanager.SecretManagerServiceClient()

    secret_fqn = (
        f"projects/{project_id}/secrets/{django_admin_secret_name}/versions/latest"
    )
    payload = secret_client.access_secret_version(name=secret_fqn).payload
    return payload.data.decode("UTF-8")


@pytest.fixture
def checkout_url(cloudrun_url):
    return cloudrun_url + "/api/checkout"


@pytest.fixture
def csrf_token(checkout_client, cloudrun_url):
    response = checkout_client.get(cloudrun_url + "/api/csrf_token")
    return response.json()["csrfToken"]
