# Terraform

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "< 7.0.0"
    }
    docker = {
      source = "kreuzwerker/docker"
    }
  }
  backend "gcs" {}
  # Bucket dynamically set in "terraform init" calls
}

provider "google" {
  project = var.project_id
  region  = var.region
}

data "google_project" "project" {
  project_id = var.project_id
}
