# After Terraform
echo "Deploy client"
gcloud builds submit --config provisioning/client.cloudbuild.yaml
