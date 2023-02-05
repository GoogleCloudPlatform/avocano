# Before Terraform

echo "Create Firebase Image"
gcloud builds submit --config provisioning/firebase-builder.cloudbuild.yaml --no-source

echo "Create Server Image"
gcloud builds submit --config provisioning/server.cloudbuild.yaml
