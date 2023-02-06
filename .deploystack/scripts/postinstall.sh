# in lieu of dynamic success messages, make the output with a script.

TERRAFORM_DIR=provisioning/terraform
terraform -chdir=${TERRAFORM_DIR} output usage