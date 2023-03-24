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

# This dockerfile is used when using Cloud Run Jobs-based client deployment
# May not be used in all cases. 

# Execute with "--build-arg PROJECT_ID=$PROJECT_ID"
ARG PROJECT_ID=YOURPROJECTID
FROM gcr.io/$PROJECT_ID/firebase

# Override with "--build-arg AVOCANO_PURCHASE_MODE=cart"
ARG AVOCANO_PURCHASE_MODE=""

COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build 

RUN npm install -g json
ENTRYPOINT ./docker-deploy.sh