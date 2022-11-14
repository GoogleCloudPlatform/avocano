# Secret Manager values

## Django Admin Password
resource "random_password" "django_admin_password" {
  length  = 32
  special = false
}

resource "google_secret_manager_secret" "django_admin_password" {
  secret_id = "django_admin_password"
  replication {
    automatic = true
  }
  depends_on = [google_project_service.enabled]
}

resource "google_secret_manager_secret_iam_binding" "django_admin_password" {
  secret_id = google_secret_manager_secret.django_admin_password.id
  role      = "roles/secretmanager.secretAccessor"
  members   = [local.automation_SA]
}

resource "google_secret_manager_secret_version" "django_admin_password" {
  secret      = google_secret_manager_secret.django_admin_password.id
  secret_data = random_password.django_admin_password.result
}

## Django Secret Key

resource "random_password" "django_secret_key" {
  special = false
  length  = 50
}
resource "google_secret_manager_secret" "django_settings" {
  secret_id = "django_settings"
  replication {
    automatic = true
  }
  depends_on = [google_project_service.enabled]
}

## Django configuration settings
resource "google_secret_manager_secret_version" "django_settings" {
  secret      = google_secret_manager_secret.django_settings.id
  secret_data = <<EOF
DATABASE_URL="postgres://${google_sql_user.django.name}:${google_sql_user.django.password}@//cloudsql/${google_sql_database_instance.postgres.project}:${google_sql_database_instance.postgres.region}:${google_sql_database_instance.postgres.name}/${google_sql_database.database.name}"
GS_BUCKET_NAME="${google_storage_bucket.media.name}"
SECRET_KEY="${random_password.django_secret_key.result}"
EOF
}

resource "google_secret_manager_secret_iam_binding" "django_settings" {
  secret_id = google_secret_manager_secret.django_settings.id
  role      = "roles/secretmanager.secretAccessor"
  members   = [local.server_SA, local.automation_SA]
}
