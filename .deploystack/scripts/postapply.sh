# After Terraform
# TODO(glasnt): this file is set by terraform, unsure how else to get user input
PROJECT_ID=$(cat provisioning/terraform/terraform.tfvars | grep project_id | cut -d'"' -f2)

echo "Setup database"
gcloud beta run jobs execute setup --wait --region $REGION

echo "Update Cloud Build permissions"
export CLOUDBUILD_SA="$(gcloud projects describe $PROJECT_ID \
    --format 'value(projectNumber)')@cloudbuild.gserviceaccount.com"

for role in firebasehosting.admin run.viewer; do
    echo "Adding $role permissions to Cloud Build"
    gcloud projects add-iam-policy-binding $PROJECT_ID \
        --member serviceAccount:$CLOUDBUILD_SA --role roles/$role > /dev/null
done

echo "Deploy client"
gcloud builds submit --config provisioning/client.cloudbuild.yaml

