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

import io
import os
from pathlib import Path
from urllib.parse import urlparse

import environ

from .cloudrun_helpers import MetadataError, get_service_url

BASE_DIR = Path(__file__).resolve().parent.parent

# Load settings from local .env, mounted .env, or envvar.
env = environ.Env()
env.read_env(BASE_DIR / ".env")
env.read_env("/settings/.env")
env.read_env(io.StringIO(os.environ.get("DJANGO_ENV", None)))

SECRET_KEY = env("SECRET_KEY")
DEBUG = env("DEBUG", default=False)

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "store",
    "colorfield",
    "corsheaders",
    "rest_framework",
    "django_filters",
    "drf_spectacular",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "avocano_api.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Used for local dev, and cloud-run-proxy
local_host = "http://localhost:8080"


CLOUDRUN_SERVICE_URL = env("CLOUDRUN_SERVICE_URL", default=None)

# If the Cloud Run service isn't defined, try dynamically retrieving it.
if not CLOUDRUN_SERVICE_URL:
    try:
        CLOUDRUN_SERVICE_URL = get_service_url()
    except MetadataError:
        pass

if CLOUDRUN_SERVICE_URL:
    ALLOWED_HOSTS = [urlparse(CLOUDRUN_SERVICE_URL).netloc]
    CSRF_TRUSTED_ORIGINS = [CLOUDRUN_SERVICE_URL, local_host]
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
else:
    ALLOWED_HOSTS = ["*"]
    CSRF_TRUSTED_ORIGINS = [local_host]

CORS_ORIGIN_ALLOW_ALL = True


WSGI_APPLICATION = "avocano_api.wsgi.application"


# Database
# https://docs.djangoproject.com/en/stable/ref/settings/#databases

# Use django-environ to parse the connection string
DATABASES = {"default": env.db()}

# If the flag as been set, configure to use proxy
if env("USE_CLOUD_SQL_AUTH_PROXY", default=None):
    DATABASES["default"]["HOST"] = "127.0.0.1"
    DATABASES["default"]["PORT"] = 5432


# Password validation
# https://docs.djangoproject.com/en/stable/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Django REST Framework
REST_FRAMEWORK = {
    # Any exposed endpoints can be accessed by any client that has access to the API itself.
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    # For automatic OpenAPI schema.
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}


# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
MEDIA_URL = "/media/"

# Use Cloud Storage if configured, otherwise use local storage.
if GS_BUCKET_NAME := env("GS_BUCKET_NAME", default=None):
    GS_DEFAULT_ACL = "publicRead"
    DEFAULT_FILE_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
    STATICFILES_STORAGE = "storages.backends.gcloud.GoogleCloudStorage"
else:
    DEFAULT_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
    STATIC_ROOT = os.path.join(BASE_DIR, STATIC_URL.replace("/", ""))
    MEDIA_ROOT = os.path.join(BASE_DIR, MEDIA_URL.replace("/", ""))
