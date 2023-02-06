# After Terraform

TERRAFORM_DIR=provisioning/terraform

PROJECT_ID=$(terraform -chdir=${TERRAFORM_DIR} output project_id | tr -d '"')
REGION=$(terraform -chdir=${TERRAFORM_DIR} output region | tr -d '"')

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

