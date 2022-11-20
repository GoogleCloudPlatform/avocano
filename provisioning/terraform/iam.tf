
# Service Accounts

locals {
  # Helpers for the clunky formatting of these values
  automation_SA = "serviceAccount:${google_service_account.automation.email}"
  server_SA     = "serviceAccount:${google_service_account.server.email}"
  client_SA     = "serviceAccount:${google_service_account.client.email}"
}

resource "google_service_account" "server" {
  account_id   = "api-backend"
  display_name = "API Backend service account"
  depends_on   = [google_project_service.enabled]
}

resource "google_service_account" "client" {
  account_id   = "client-frontend"
  display_name = "Client Frontend service account"
  depends_on   = [google_project_service.enabled]
}

resource "google_service_account" "automation" {
  account_id   = "automation"
  display_name = "Automation service account"
  depends_on   = [google_project_service.enabled]
}

# Both the server and Cloud Build can access the database
resource "google_project_iam_binding" "server_permissions" {
  project    = var.project
  role       = "roles/cloudsql.client"
  members    = [local.server_SA, local.automation_SA]
  depends_on = [google_service_account.server, google_service_account.automation]
}


# Server needs introspection permissions
resource "google_project_iam_binding" "server_introspection" {
  project    = var.project
  role       = "roles/run.viewer"
  members    = [local.server_SA]
  depends_on = [google_service_account.server]
}