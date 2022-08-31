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


from django.http import HttpResponse


def index(request):
    return HttpResponse(
        """
    <body>
        <style>li { list-style: none;} li::before { content: "➡ "}</style>
        <h1>✨🥑✨</h1>
        <ul>
            <li><a href="/api">/api</a></li>
            <li><a href="/admin">/admin</a></li>
        </ul>
    </body>
    """
    )
