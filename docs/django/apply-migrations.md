# Applying database migrations

If you want to apply database migrations, this is included as part of the `cloudbuild.yaml` file:


```
  - id: server migrate
    name: "gcr.io/google.com/cloudsdktool/cloud-sdk:slim"
    env:
    - "CLOUDSDK_RUN_REGION=$_REGION"
    script: gcloud run jobs execute migrate --wait
```

In this case, `CLOUDSDK_RUN_REGION` automatically sets the `--region` parameter for the `gcloud run` command. 


However, if you want to generate migrations, you will need to do this separately: it's better
to create these on your local machine and commit them to the codebase, then to have them 
generated in CI and not saved anywhere. See [Extending example](../admin/extending-example.md#creating-migrations) for more info. 