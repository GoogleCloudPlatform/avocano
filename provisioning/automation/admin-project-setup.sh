#!/bin/bash

# This script sets up the requirements for the parent project which will be used to start tests.
# param:
#   folder_id: a folder to use for tests, to borrow configs. 

# borrows heavily from fourkeys https://github.com/GoogleCloudPlatform/fourkeys/blob/main/experimental/terraform/setup.sh
# this script copied from unicodex https://github.com/GoogleCloudPlatform/django-demo-app-unicodex/blob/latest/experimental/project_setup.sh

source bashhelpers.sh

# Sets up a parent project for CI work
export PARENT_PROJECT=$(gcloud config get-value project)
echo "🔨 configure parent project $PARENT_PROJECT"

export PARENT_FOLDER=$1
stepdo "confirm folder exists"
gcloud resource-manager folders describe $PARENT_FOLDER --format "value(lifecycleState)"
stepdone 
echo "🔧 configure parent folder $PARENT_FOLDER"

export ORGANIZATION=$(gcloud organizations list --format "value(name)")
echo "🗜 configure organisation $ORGANIZATION"

export BILLING_ACCOUNT=$(gcloud beta billing projects describe ${PARENT_PROJECT} --format="value(billingAccountName)" || sed -e 's/.*\///g')
echo "💳 configure billing account $BILLING_ACCOUNT"

export PARENT_PROJECTNUM=$(gcloud projects describe ${PARENT_PROJECT} --format='value(projectNumber)')
export DEFAULT_GCB=$PARENT_PROJECTNUM@cloudbuild.gserviceaccount.com

stepdo "Enable services on parent"
gcloud services enable --project $PARENT_PROJECT  \
    cloudresourcemanager.googleapis.com \
    cloudbilling.googleapis.com \
    cloudbuild.googleapis.com \
    iam.googleapis.com \
    sqladmin.googleapis.com \
    firebase.googleapis.com
stepdone

stepdo "Create firebase builder"
gcloud builds submit --config provisioning/firebase-builder.cloudbuild.yaml --no-source

stepdo "Create service account"
SA_NAME=ci-serviceaccount
SA_EMAIL=$(gcloud iam service-accounts list --filter $SA_NAME --format 'value(email)')
if [ -z "$SA_EMAIL" ]; then
    gcloud iam service-accounts create $SA_NAME --project $PARENT_PROJECT
    SA_EMAIL=$(gcloud iam service-accounts list --filter $SA_NAME --format 'value(email)')
else
    echo "Service account $SA_EMAIL already exists. Skipping"
fi
stepdone

stepdo "Create CI logs bucket"
LOGS_BUCKET=gs://${PARENT_PROJECT}-buildlogs

if gsutil ls $LOGS_BUCKET 2>&1 | grep -q 'BucketNotFoundException'; then
    gsutil mb -p $PARENT_PROJECT $LOGS_BUCKET

    gsutil iam ch \
        serviceAccount:${DEFAULT_GCB}:roles/storage.objectAdmin \
        $LOGS_BUCKET
else
    echo "Bucket $LOGS_BUCKET already exists. Skipping"
fi
stepdone

stepdo "Grant access to default logs bucket"
DEFAULT_BUCKET=gs://${PARENT_PROJECT}_cloudbuild

if gsutil ls $DEFAULT_BUCKET 2>&1 | grep -q 'BucketNotFoundException'; then
    echo "Default Cloud Build log bucket not automatically created. Fixing."
    gsutil mb -p $PARENT_PROJECT $DEFAULT_BUCKET
fi
gsutil iam ch \
    serviceAccount:${SA_EMAIL}:roles/storage.admin \
    $DEFAULT_BUCKET
stepdone

stepdo "Grant roles to service account on project"
for role in storage.admin iam.serviceAccountUser; do
    quiet gcloud projects add-iam-policy-binding $PARENT_PROJECT \
        --member serviceAccount:${SA_EMAIL} \
        --role roles/${role}
done
stepdone

stepdo "Grant roles to service account on folder"
for role in billing.projectManager resourcemanager.projectCreator resourcemanager.projectDeleter resourcemanager.projectIamAdmin; do
    quiet gcloud resource-manager folders add-iam-policy-binding $PARENT_FOLDER \
        --member serviceAccount:${SA_EMAIL} \
        --role roles/${role}
done
stepdone

stepdo "Grant roles to service account on billing account"
for role in billing.user billing.viewer; do
    quiet gcloud beta billing accounts add-iam-policy-binding $BILLING_ACCOUNT \
        --member serviceAccount:${SA_EMAIL} \
        --role roles/${role}
done
stepdone