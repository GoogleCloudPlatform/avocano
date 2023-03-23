output "project_id" {
  value = var.project_id
}

output "region" {
  value = var.region
}

output "usage" {
  sensitive = true
  value     = <<-EOF

    This deployment is now ready for use!

    https://${var.project_id}.web.app

    API Login:

    ${google_cloud_run_v2_service.server.uri}/admin

    Username: admin
    Password: ${google_secret_manager_secret_version.django_admin_password.secret_data}

    EOF

}
