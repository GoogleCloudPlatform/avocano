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


import logging
import os

import google.auth
import httpx
from googleapiclient.discovery import build as google_api
from googleapiclient.errors import HttpError as GAPIHTTPError

## Dynamically determine the Cloud Run Service URL

# Interrogates the metadata service to determine the URL of itself.
# Requires the Cloud Run service account have run.services.get permissions.

# Removes the need to provide the service URL as an enviroment variable to
# pass onto CSRF settings for trusted domain permissions.

# Will only work if the service is running Cloud Run, and will quickly error
# at the first point of issue trying to contact the metadata server.


class MetadataError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


def _project_id():
    """Use the Google Auth helper (via the metadata service) to get the Google Cloud Project"""
    try:
        _, project = google.auth.default()
    except google.auth.exceptions.DefaultCredentialsError:
        raise MetadataError("Could not automatically determine credentials")
    if not project:
        raise MetadataError("Could not determine project from credentials.")
    return project


def _region():
    """Use the local metadata service to get the region"""
    try:
        resp = httpx.get(
            "http://metadata.google.internal/computeMetadata/v1/instance/region",
            headers={"Metadata-Flavor": "Google"},
        )
        return resp.text.split("/")[-1]
    except httpx.RequestError as e:
        raise MetadataError(f"Could not determine region. Error: {e}")


def _service_name():
    service = os.environ.get("K_SERVICE")
    if not service:
        raise MetadataError("Did not find K_SERVICE. Are you running in Cloud Run?")
    return service


def _service_url(project, region, service):
    try:
        run_api = google_api("run", "v2")
        fqname = f"projects/{project}/locations/{region}/services/{service}"
        service = run_api.projects().locations().services().get(name=fqname).execute()
        return service["uri"]
    except (GAPIHTTPError, KeyError) as e:
        raise MetadataError(f"Could not determine service url. Error: {e}")


def get_service_url():
    return _service_url(_project_id(), _region(), _service_name())


def get_project_id():
    return _project_id()
