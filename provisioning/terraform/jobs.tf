resource "google_cloud_run_v2_job" "setup" {

  name         = "setup"
  location     = var.region
  launch_stage = "BETA"

  template {
    template {
      service_account = google_service_account.automation.email
      containers {
        image   = data.google_container_registry_image.server.image_url
        command = ["setup"]
        env {
          name = "DJANGO_ENV"
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.django_settings.secret_id
              version = "latest"
            }
          }
        }
        env {
          name = "ADMIN_PASSWORD"
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.django_admin_password.secret_id
              version = "latest"
            }
          }
        }
        volume_mounts {
          name       = "cloudsql"
          mount_path = "/cloudsql"
        }
      }
      volumes {
        name = "cloudsql"
        cloud_sql_instance {
          instances = [google_sql_database_instance.postgres.connection_name]
        }
      }
    }
  }

  depends_on = [
    google_secret_manager_secret_version.django_settings,
    google_project_service.enabled
  ]
}

resource "google_cloud_run_v2_job" "migrate" {


  name         = "migrate"
  location     = var.region
  launch_stage = "BETA"

  template {
    template {
      service_account = google_service_account.automation.email
      containers {
        image   = data.google_container_registry_image.server.image_url
        command = ["migrate"]
        env {
          name = "DJANGO_ENV"
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.django_settings.secret_id
              version = "latest"
            }
          }
        }
        volume_mounts {
          name       = "cloudsql"
          mount_path = "/cloudsql"
        }
      }
      volumes {
        name = "cloudsql"
        cloud_sql_instance {
          instances = [google_sql_database_instance.postgres.connection_name]
        }
      }
    }
  }

  depends_on = [
    google_secret_manager_secret_version.django_settings,
    google_project_service.enabled
  ]
}


resource "google_cloud_run_v2_job" "client" {

  name         = "client"
  location     = var.region
  launch_stage = "BETA"

  template {
    template {
      containers {
        image   = data.google_container_registry_image.client.image_url
        command = ["firebase"]
        args    = ["deploy", "--project", var.project_id, "--only", "hosting"]

      }
    }
  }

  depends_on = [
    google_project_service.enabled
  ]
}
