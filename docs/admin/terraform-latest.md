# Have Terraform use the latest container in deployment

When using Terraform to provision Cloud Run services, you need to specify the image name. 

By default, if you don't declare a tag, you'll normally use the "latest" image, the newest image available. 

But since Terraform will be told "latest", and it detects the service is using "latest" from when it was deployed, not now, you'll get issues. 

In this case, this repo uses a [solution](https://github.com/hashicorp/terraform-provider-google/issues/6706#issuecomment-657039775) that sources the exact current "latest" by the sha as detected in the Container Registry. 

The Terraform config in this repo uses the `docker` provider and [`registry_auth`](https://github.com/GoogleCloudPlatform/avocano/search?q=registry_auth) to talk to Artifact Registry, and from that data, build the fully qualified image name to pass to Terraform. 

This way, the "latest" image is always used by Terraform. 