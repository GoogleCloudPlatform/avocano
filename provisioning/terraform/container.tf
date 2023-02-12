
# Use the docker registry providers to get accurate latest image information
# Allows Terraform to always update to the container image associated as "latest" without
# locking to the literal string "latest". 
# https://github.com/hashicorp/terraform-provider-google/issues/6706#issuecomment-657039775

#
# Images are built in /cloudbuild.yaml
#

# Registry
data "google_client_config" "default" {}

locals {
  # these match the values in /cloudbuild.yaml
  gcr_hostname   = "gcr.io"
  server_image   = var.service_name
  client_image   = "client"
  image_registry = "${local.gcr_hostname}/${var.project_id}"
}


# Authenticate to our container registry
provider "docker" {
  registry_auth {
    address  = local.gcr_hostname
    username = "oauth2accesstoken"
    password = data.google_client_config.default.access_token
  }
}

# Establish image name
data "docker_registry_image" "server" {
  name = "${local.image_registry}/${local.server_image}"
}

# Get exact image information
data "google_container_registry_image" "server" {
  name    = local.server_image
  project = var.project_id
  digest  = data.docker_registry_image.server.sha256_digest
}

data "google_container_registry_image" "client" {
  name    = local.client_image
  project = var.project_id
  digest  = data.docker_registry_image.server.sha256_digest
}
