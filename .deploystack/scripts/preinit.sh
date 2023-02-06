# Before Terraform

echo "Enable additional APIs"
gcloud services enable cloudresourcemanager.googleapis.com cloudbuild.googleapis.com iam.googleapis.com

echo "Update Cloud Build permissions"
export CLOUDBUILD_SA="$(gcloud projects describe $PROJECT_ID \
    --format 'value(projectNumber)')@cloudbuild.gserviceaccount.com"
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$CLOUDBUILD_SA --role roles/firebasehosting.admin

echo "Create Firebase Image"
gcloud builds submit --config provisioning/firebase-builder.cloudbuild.yaml --no-source

echo "Create Server Image"
gcloud builds submit --config provisioning/server.cloudbuild.yaml
