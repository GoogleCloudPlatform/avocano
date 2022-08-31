#!/bin/bash
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


## This script automates some basic setup for new projects, 
## then runs Cloud Build, Terraform, and initial deployment. 
## 
## For updates, just run `gcloud builds submit`

# Make sure the script stops if any command fails
set -e

# Pretty, obvious output
aecho() { 
    printf "🥑 \u001b[32;1m ${1}... \033[0m\n"
}
eecho() { 
    printf "🥑 \u001b[32;1m ${1} \033[0m\n"
}

# Some commands are noisy, so make them quiet.
function quiet {
    $* > /dev/null 2>&1 
}

echo "Configuring active project and region..."
export PROJECT_ID=${PROJECT_ID:=$(gcloud config get project)}
export REGION=${REGION:=us-centra1} # default us-centra1 region if not defined
export PROJECTNUM=$(gcloud projects describe ${PROJECT_ID} --format='value(projectNumber)')  
export SERVICE_NAME="api" # from provisioning/terraform/service.tf

aecho "Running setup.sh against ${PROJECT_ID} in ${REGION}"

aecho "Setup Firebase Builder"
gcloud builds submit --config provisioning/firebase-builder.cloudbuild.yaml --no-source

aecho "Configuring Terraform"
export TFSTATE_BUCKET=terraform-${PROJECT_ID}
gsutil mb gs://$TFSTATE_BUCKET || true 

cat >provisioning/terraform/state.tf <<_EOF
terraform { 
  backend gcs {
    bucket = "$TFSTATE_BUCKET"
  }
}
_EOF

aecho "Granting Cloud Build permissions"
export CLOUDBUILD_SA="$(gcloud projects describe $PROJECT_ID \
    --format 'value(projectNumber)')@cloudbuild.gserviceaccount.com"
quiet gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$CLOUDBUILD_SA --role roles/owner
quiet gsutil iam ch \
        serviceAccount:${CLOUDBUILD_SA}:roles/storage.admin \
        gs://$TFSTATE_BUCKET

aecho "Running Cloud Build"
gcloud builds submit

aecho "Applying database migrations"
export IMAGE_NAME=$(gcloud run services describe $SERVICE_NAME --region $REGION \
    --format "value(spec.template.spec.containers.image)")
export SQL_INSTANCE=$(gcloud run services describe $SERVICE_NAME --region $REGION \
    --format  "value(spec.template.metadata.annotations.'run.googleapis.com/cloudsql-instances')")

gcloud beta run jobs create migrate-database-$(date +"%s") \
  --image $IMAGE_NAME \
  --region $REGION \
  --service-account automation@${PROJECT_ID}.iam.gserviceaccount.com \
  --set-secrets DJANGO_ENV=django_settings:latest,ADMIN_PASSWORD=django_admin_password:latest \
  --set-cloudsql-instances $SQL_INSTANCE \
  --command "firstload" \
  --execute-now --wait --max-retries 1

eecho "Website now available at https://${PROJECT_ID}.web.app"