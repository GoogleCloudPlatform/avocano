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

import logging
from django.http import HttpResponse, HttpResponseServerError


class HealthCheckMiddleware(object):
    """Django middleware to answer health checks.

    Responds to /healthy and /ready
    """

    def __init__(self, get_response) -> None:
        self.get_response = get_response

    def __call__(self, request):
        if request.method == "GET":
            if request.path == "/healthy":
                return self.healthy(request)
            if request.path == "/ready":
                return self.dbcheck(request)
        return self.get_response(request)

    def healthy(self, request):
        return HttpResponse("ok")

    def dbcheck(self, request) -> HttpResponse:
        try:
            import django.db as ddb

            dbconn = ddb.connections[ddb.DEFAULT_DB_ALIAS]
            c = dbconn.cursor()
            c.execute("SELECT 1;")
            row = c.fetchone()
            if row == None:
                raise Exception("db: invalid response")
        except Exception as e:
            logging.exception(e)
            return HttpResponseServerError("db: failed health check")
        return HttpResponse("ok")
