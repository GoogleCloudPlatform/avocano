resource "google_cloud_run_v2_service" "server" {
  name     = var.service_name
  location = var.region
  client   = "terraform"

  provider     = google-beta
  launch_stage = "BETA"

  template {
    service_account = google_service_account.server.email
    containers {
      image = data.google_container_registry_image.server.image_url
      ports {
        container_port = 8080
      }
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
      env {
        name  = "USE_CLOUD_SQL_AUTH_PROXY"
        value = "True"
      }
      startup_probe {
        http_get {
          path = "/ready"
        }
        period_seconds        = 1
        initial_delay_seconds = 0
        timeout_seconds       = 1
        failure_threshold     = 10
      }
      liveness_probe {
        http_get {
          path = "/healthy"
        }
      }
    }
    containers {
      name  = "cloud-sql-proxy"
      image = "gcr.io/cloud-sql-connectors/cloud-sql-proxy:latest"
      args  = ["--port=5432", google_sql_database_instance.postgres.connection_name]
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
