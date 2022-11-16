# Automation

This folder is for meta automation. 

TODO(glasnt) describe integration test setup. 

Run once:
 * `admin-project-setup.sh $FOLDER_ID`
     - sets up current project and designated folder as a place to automatically create projects. 

Run periodically: 

 * `gcloud builds submit [--config cloudbuild.yaml]`
    - runs `project-setup.sh` to create a new project
    - runs `deploy.cloudbuild.yaml` to create a new deployment in that project.
    - runs `TODO` to test project
    - deletes project.
