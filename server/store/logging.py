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


import sys
from unittest import mock

import google.auth
import google.cloud.logging


def setup_logging():
    """
    Trying to use Cloud Logging without authentication causes DefaultCredentialsError.
    So, only use Cloud Logging when in an environment that will have these credentials.
    """

    def use_mock_logging():
        print("MOCK LOG")
        return mock.Mock()

    # Check if we're running "manage.py test"
    if sys.argv[1:2] == ["test"]:
        return use_mock_logging()

    # Check for default credentials
    try:
        _, project = google.auth.default()
    except google.auth.exceptions.DefaultCredentialsError:
        return use_mock_logging()

    # import logging as normal
    client = google.cloud.logging.Client()
    client.setup_logging()
    logger = client.logger("avocano_log")

    return logger
