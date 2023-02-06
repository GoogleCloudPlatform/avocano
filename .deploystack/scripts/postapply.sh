# After Terraform

echo "Update Cloud Build permissions"
export CLOUDBUILD_SA="$(gcloud projects describe $GOOGLE_CLOUD_PROJECT \
    --format 'value(projectNumber)')@cloudbuild.gserviceaccount.com"

for role in firebasehosting.admin run.viewer; do
    echo "Adding $role permissions to Cloud Build"
    gcloud projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT \
        --member serviceAccount:$CLOUDBUILD_SA --role roles/$role > /dev/null
done

echo "Deploy client"
gcloud builds submit --config provisioning/client.cloudbuild.yaml

