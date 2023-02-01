# Deploy a Django and Firebase Hosting Retail Website

## Introduction

You’re going to build a sample application with multiple Cloud Run services: 

* A Django API server, using [Django REST Framework](https://www.django-rest-framework.org/) on Cloud Run
  * based by a Cloud SQL Postgres database
* A NodeJS client front end, using the [Lit](https://lit.dev/) framework, on Firebase Hosting


You'll use a script to deploy the required infrastucture, which itself will use Terraform and Cloud Build. 

This walkthrough requires a number of dependencies, including `firebase`, `gcloud`, and `terraform`. All of which are available in the Google Cloud Shell environment. 

## Project Setup

Before you begin, you will need a Google Cloud project.

1. <walkthrough-project-setup billing="true"></walkthrough-project-setup>

1. Confirm the Cloud Shell is configured with your selected project: 

    ```bash
    gcloud config set project <walkthrough-project-id/>
    ```

1. <walkthrough-enable-apis apis="cloudresourcemanager.googleapis.com,cloudbuild.googleapis.com,iam.googleapis.com"></walkthrough-enable-apis>

## Automated deployment


You'll now use a script to deploy the sample application. 

To use the script, you will need to set a number of values for the `gcloud` and `firebase` tools to reference.

1. Configure the Project and Region variables.

    ```bash
    export PROJECT_ID=<walkthrough-project-id/>
    export REGION=us-central1
    ```

1. Deploy the application using the setup script: 

    ```bash
    bash setup.sh
    ```

## View application

Your application is now available at [https://<walkthrough-project-id/>.web.app](https://<walkthrough-project-id/>.web.app).

See what you can now do with this application by [reading the docs][project-docs].

## Conclusion

<walkthrough-conclusion-trophy></walkthrough-conclusion-trophy>

You're done!

Here's what to do next:

* Learn more about [what you can do with this website][project-docs]
* Learn about [Managing Infrastrcutre as Code](https://cloud.google.com/architecture/managing-infrastructure-as-code)

[project-docs]: https://github.com/GoogleCloudPlatform/avocano/tree/main/docs
