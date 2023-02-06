# Applying database migrations

If you want to apply database migrations, a convenience Cloud Run job has been created for you. 

To run migrations: 

```
gcloud beta run jobs execute migrate \
    --region us-central1 --wait
```

To run migrations as part of the Cloud Build, add a step to the `cloudbuild.yaml` file:

```
  - id: server migrate
    name: "gcr.io/google.com/cloudsdktool/cloud-sdk:slim"
    entrypoint: gcloud
    args: ["beta", "run", "jobs", "execute",  "migrate", 
           "--region", $_REGION, "--wait"] 
```

This step must be after the image push step, but can be before or after Terraform (the terraform step
updates the Cloud Run service to the latest image). If your database changes must be made **before**
the application is updated, put it before the terraform step.
