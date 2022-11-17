import pytest
import os
import google.auth
from google.cloud import secretmanager
from googleapiclient.discovery import build


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
    run_api = build("run", "v1")
    service_fqn = f"projects/{project_id}/locations/{region}/services/{service_name}"
    return run_api.projects().locations().services().get(name=service_fqn).execute()


@pytest.fixture
def cloudrun_url(cloudrun_service):
    return cloudrun_service["status"]["address"]["url"]


@pytest.fixture
def django_admin_password(project_id, django_admin_secret_name):
    secret_client = secretmanager.SecretManagerServiceClient()

    secret_fqn = (
        f"projects/{project_id}/secrets/{django_admin_secret_name}/versions/latest"
    )
    payload = secret_client.access_secret_version(name=secret_fqn).payload
    return payload.data.decode("UTF-8")
