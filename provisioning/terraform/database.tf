# Cloud SQL Database

## Instance

resource "google_sql_database_instance" "postgres" {
  name             = var.instance_name
  database_version = "POSTGRES_14"
  project          = var.project
  region           = var.region

  settings {
    tier = "db-custom-2-4096" # 2 CPU, 4GB Memory
  }
  depends_on = [google_project_service.enabled]

}

## Database
resource "google_sql_database" "database" {
  name     = var.database_name
  instance = google_sql_database_instance.postgres.name
}

## Database User
## Details used in Django config settings
# NOTE: users created this way automatically gain cloudsqladmin rights.
resource "google_sql_user" "django" {
  name     = var.database_username
  instance = google_sql_database_instance.postgres.name
  password = random_password.database_user_password.result
}
resource "random_password" "database_user_password" {
  length  = 30
  special = false
}