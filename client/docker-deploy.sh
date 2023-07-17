#!/bin/bash
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


# Script to assist in Dockerfile-based deployments. 
# 'json' was installed from npm in Dockerfile as a utility to assist in inline json file editing

# any errors? exit immediately. 
set -e

echo "Deploying Firebase..."

# escape if project_id not defined (mandatory, required later)
if [[ -z $PROJECT_ID ]]; then
   echo "PROJECT_ID not defined. Cannot deploy. Exiting."
   exit 1
fi

# if service name supplied, update firebase.json
if [[ -n $SERVICE_NAME ]]; then
    echo "Supplied with service name $SERVICE_NAME. Updating config. "
    json -I -f firebase.json -e "this.hosting.rewrites[0].run.serviceId='$SERVICE_NAME'"
    UPDATED=true

    # if deploying with a suffix, adjust the config to suit the custom site
    # https://firebase.google.com/docs/hosting/multisites#set_up_deploy_targets
    if [[ -n $SUFFIX ]]; then
        json -I -f firebase.json -e "this.hosting.target='$SUFFIX'"
        UPDATED=true
        
        echo "{\"projects\": {}, \"targets\": {\"${PROJECT_ID}\": {\"hosting\": {\"${SUFFIX}\": [\"${PROJECT_ID}-${SUFFIX}\"]}}},\"etags\": {}}" | json > .firebaserc
        echo "Customised .firebaserc created to support site."
        cat .firebaserc
    fi
fi

# if region supplied, update firebase.json
if [[ -n $REGION ]]; then
    echo "Supplied with region $REGION. Updating config. "
    json -I -f firebase.json -e "this.hosting.rewrites[0].run.region='$REGION'"
    UPDATED=true
fi

# If anything was updated, then export the output. 
if [[ -n $UPDATED ]]; then
    echo "Deploying with the following updated config: "
    cat firebase.json
fi

firebase deploy --project $PROJECT_ID --only hosting