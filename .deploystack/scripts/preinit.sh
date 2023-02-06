# Before Terraform

echo "Enable additional APIs"
gcloud services enable cloudresourcemanager.googleapis.com cloudbuild.googleapis.com iam.googleapis.com

echo "Update Cloud Build permissions"
export CLOUDBUILD_SA="$(gcloud projects describe $GOOGLE_CLOUD_PROJECT \
    --format 'value(projectNumber)')@cloudbuild.gserviceaccount.com"

for role in firebasehosting.admin run.viewer; do
    echo "Adding $role permissions to Cloud Build"
    gcloud projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT \
        --member serviceAccount:$CLOUDBUILD_SA --role roles/$role > /dev/null

echo "Create Firebase Image"
gcloud builds submit --config provisioning/firebase-builder.cloudbuild.yaml --no-source

echo "Create Server Image"
gcloud builds submit --config provisioning/server.cloudbuild.yaml
