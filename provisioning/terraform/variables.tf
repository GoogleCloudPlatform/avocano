variable "project_id" {
  type        = string
  description = "Google Cloud Project ID"
}

# Customisable, but note some values may be hardcoded in docs, other configs. 
variable "region" {
  default     = "us-central1"
  type        = string
  description = "Google Cloud Region"
}

variable "instance_name" {
  type        = string
  default     = "psql"
  description = "Cloud SQL Instance name"
}

variable "service_name" {
  type        = string
  default     = "server"
  description = "Cloud Run service name"
}

variable "database_name" {
  type        = string
  default     = "django"
  description = "Cloud SQL database name"
}


variable "database_username" {
  type        = string
  default     = "server"
  description = "Cloud SQL database name"
}
