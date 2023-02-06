# in lieu of dynamic success messages, make the output with a script.

# TODO(glasnt): this file is set by terraform, unsure how else to get user input
REGION=$(cat provisioning/terraform/terraform.tfvars | grep region | cut -d'"' -f2)
PROJECT_ID=$(cat provisioning/terraform/terraform.tfvars | grep project_id | cut -d'"' -f2)

API_URL=$(gcloud run services describe server --format "value(status[0].url)" --region $REGION)
ADMIN_PASSWORD=$(gcloud secrets versions access latest --secret django_admin_password)
FIREBASE_URL="https://${PROJECT_ID}.web.app"


echo "
🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑🥑

Avocano has been deployed!

Access the website: $FIREBASE_URL

Log into the API:
$API_URL

Username: admin
Password: $ADMIN_PASSWORD

✨"