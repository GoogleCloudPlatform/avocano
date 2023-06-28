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
import os
import urllib3
import google.auth

## Dynamically determine the Cloud Run Service URL

# Interrogates the metadata service to determine the URL of itself.
# Requires the Cloud Run service account have run.services.get permissions.

# Removes the need to provide the service URL as an environment variable to
# pass onto CSRF settings for trusted domain permissions.

# Will only work if the service is running Cloud Run, and will quickly error
# at the first point of issue trying to contact the metadata server.

# update this and json.loads calls when urllib3 is updated to 2.x
http = urllib3.PoolManager()


class MetadataError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


def _auth():
    """Use the Google Auth helper (via the metadata service) to get the Google Cloud Project"""
    try:
        creds, project = google.auth.default(
            scopes=["https://www.googleapis.com/auth/cloud-platform"]
        )
    except google.auth.exceptions.DefaultCredentialsError:
        raise MetadataError("Could not automatically determine credentials")
    if not project:
        raise MetadataError("Could not determine project from credentials.")
    return creds, project


def _region():
    """Use the local metadata service to get the region"""
    try:
        resp = http.request(
            "GET",
            "http://metadata.google.internal/computeMetadata/v1/instance/region",
            headers={"Metadata-Flavor": "Google"},
        )
        return resp.data.decode("utf-8").split("/")[-1]
    except urllib3.exceptions.HTTPError as e:
        raise MetadataError(f"Could not determine region. Error: {e}")


def _service_name():
    """Use Cloud Run provided envvar to return service name"""
    service = os.environ.get("K_SERVICE")
    if not service:
        raise MetadataError("Did not find K_SERVICE. Are you running in Cloud Run?")
    return service


def _service_url(region, service):
    """Use helper methods and Cloud Run API to pull the service URL"""
    try:
        creds, project = _auth()

        # Build authentication token for calling the API
        request = google.auth.transport.requests.Request()
        creds.refresh(request)
        token = creds.token
        headers = {"Authorization": "Bearer " + token}

        # Build identifier for Cloud Run service
        fqname = f"projects/{project}/locations/{region}/services/{service}"

        # Request the information (requires run.services.get auth)
        resp = http.request(
            "GET", f"https://run.googleapis.com/v2/{fqname}", headers=headers
        )

        # return service URL
        return json.loads(resp.data)["uri"]
    except urllib3.exceptions.HTTPError as e:
        raise MetadataError(f"Could not determine service url. Error: {e}")


def get_service_url():
    return _service_url(_region(), _service_name())


def get_project_id():
    _, project_id = _auth()
    return project_id
