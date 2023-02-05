# After Terraform


echo "Deploy server"
gcloud builds submit --config provisioning/server.cloudbuild.yaml
