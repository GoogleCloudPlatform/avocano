# Migration to Artifact Registry

With the [deprecation of Container Registry](https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr), 
this demo now uses [Artifact Registry](https://cloud.google.com/artifact-registry/docs/repositories/create-repos). 

This change was completed in [PR #378](https://github.com/GoogleCloudPlatform/avocano/pull/378), requiring the following changes: 

 * On initial setup, enable the Artifact Registry API, and creating a Docker repository in Artifact Registry.
    * Container Registry is already provisioned by default in projects, so this extra step is required. 
 * Changing the image locations from `gcr.io` to `us-docker.pkg.dev`
    * The repository was created in the `us` multi-region, resulting in the subdomain `us-docker`. If it was only in one region, the subdomain would be `us-central1-docker`. 
 * Updating the logic for determining the latest image in Terraform (see [explanation](terraform-latest.md)). 

Other references still the the repo to `gcr.io` are from [Cloud Builder](https://github.com/GoogleCloudPlatform/cloud-builders)
images, that make use of the [automatic redirect for `gcr.io` domains](https://github.com/GoogleCloudPlatform/cloud-builders#container-registry-deprecation). [Read more about this migration option](https://cloud.google.com/artifact-registry/docs/transition/setup-gcr-repo).