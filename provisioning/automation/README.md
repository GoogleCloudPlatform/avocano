# Automation

This folder is for meta automation. 

This folder defines the tests and configurations to test deployments that themselves create new projects. 

## Setup

Run once:
 * `admin-project-setup.sh $FOLDER_ID`
     - sets up current project and designated folder as a place to automatically create projects. 

Run periodically: 

 * `gcloud builds submit --config provisioning/automation/cloudbuild.yaml`
    - runs `project-setup.sh` to create a new project
    - runs `deploy.cloudbuild.yaml`, which runs the same `bash setup.sh` as usual.
    - runs `test.cloudbuild.yaml`, which runs client tests
    - deletes project, if all other steps succeeded.


