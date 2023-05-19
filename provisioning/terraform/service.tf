resource "google_cloud_run_v2_service" "server" {
  name     = var.service_name
  location = var.region
  template {
    service_account = google_service_account.server.email
    containers {
      image = data.google_container_registry_image.server.image_url
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
        name  = "PYTHONPATH"
        value = ""
      }
      env {
        name  = "DJANGO_SETTINGS_MODULE"
        value = "avocano_api.settings"
      }
      env {
        name  = "OTEL_METRICS_EXPORTER"
        value = "none"
      }
      env {
        name  = "OTEL_TRACES_EXPORTER"
        value = "gcp_trace"
      }
      liveness_probe {
        http_get {
          path = "/healthy"
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
  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  depends_on = [
    google_secret_manager_secret_version.django_settings
  ]
}


# Allow server to be public readable. 
resource "google_cloud_run_service_iam_member" "server_noauth" {
  project  = google_cloud_run_v2_service.server.project
  location = google_cloud_run_v2_service.server.location
  service  = google_cloud_run_v2_service.server.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
