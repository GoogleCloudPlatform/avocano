#!/bin/bash
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