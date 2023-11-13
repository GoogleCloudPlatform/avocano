
# Use the docker registry providers to get accurate latest image information
# Allows Terraform to always update to the container image associated as "latest" without
# locking to the literal string "latest". 
# https://github.com/hashicorp/terraform-provider-google/issues/6706#issuecomment-657039775

#
# Images are built in /cloudbuild.yaml
#


locals {
  # match values in setup.sh and cloudbuild.yaml
  server_image_name = "server"
  server_image_tag  = "latest"
  registry_region   = "us"
  registry_name     = "containers"

  # Formatted registry information
  registry_hostname = "${local.registry_region}-docker.pkg.dev"
  image_registry    = "${local.registry_hostname}/${var.project_id}/${local.registry_name}"

  # Images in formats (use NAME_image in services, jobs, etc.)
  server_image_sha    = "${data.docker_registry_image.server_image.name}@${data.docker_registry_image.server_image.sha256_digest}"
  server_image_tagged = data.docker_registry_image.server_image.name
  server_image        = local.server_image_tag == "latest" ? local.server_image_sha : local.server_image_tagged
}

data "google_client_config" "default" {}

provider "docker" {
  registry_auth {
    address  = local.registry_hostname
    username = "oauth2accesstoken"
    password = data.google_client_config.default.access_token
  }
}

data "docker_registry_image" "server_image" {
  name = "${local.image_registry}/${local.server_image_name}"
}