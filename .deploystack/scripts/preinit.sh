# Before Terraform

echo "Enable additional APIs"
gcloud services enable cloudresourcemanager.googleapis.com cloudbuild.googleapis.com iam.googleapis.com

echo "Create Firebase Image"
gcloud builds submit --config provisioning/firebase-builder.cloudbuild.yaml --no-source

echo "Create Server Image"
gcloud builds submit --config provisioning/server.cloudbuild.yaml
