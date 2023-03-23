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
      startup_probe {
        http_get {
          path = "/ready"
        }
      }
      liveness_probe {
        http_get {
          path = "/healthy"
        }
      }
    }
    annotations = {
      "autoscaling.knative.dev/maxScale"      = "100"
      "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.postgres.connection_name
      "run.googleapis.com/client-name"        = "terraform"
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
data "google_iam_policy" "noauth" {
  binding {
    role    = "roles/run.invoker"
    members = ["allUsers"]
  }
}

resource "google_cloud_run_service_iam_policy" "server_noauth" {
  location    = google_cloud_run_v2_service.server.location
  project     = google_cloud_run_v2_service.server.project
  service     = google_cloud_run_v2_service.server.name
  policy_data = data.google_iam_policy.noauth.policy_data
}
