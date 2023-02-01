resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.project

  depends_on = [google_project_service.enabled]
}