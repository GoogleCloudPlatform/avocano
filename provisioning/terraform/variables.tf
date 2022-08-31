variable "project" {
  type        = string
  description = "Google Cloud Project ID"
}

variable "region" {
  default = "us-central1"
  type    = string
  description = "Google Cloud Region"

}

variable "instance_name" {
  type        = string
  default     = "psql"
  description = "Cloud SQL Instance name"
}