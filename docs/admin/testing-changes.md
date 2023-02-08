# Testing and verifying changes

## GitHub Actions

As with many GitHub projects, changes to this project are tested by GitHub actions. 

These are defined in [`/.github/workflows`](/.github/workflows), and apply to specific parts of the repo. For example, 
client side linting only runs when changes in `client/` are made. 

## Cloud Build tests

There are larger tests that may be appropriate to run before changes are merged. 

For these changes, there is a manual process to follow, as not all pull requests should trigger these tests. 

### Running `deploy-preview` on Pull Requests

The `deploy-preview` Cloud Build trigger is setup against the repo in the `avocano-preview` project, and can be run against any branch on the repo (by a Google Cloud user clicking 'Run' and naming a branch.) However, it can't be run directly against pull requests (as the code needs to be in the repo itself.)

_After_ a manual review of the changes in a pull request, an Avocano project maintainer can run `deploy-preview` with the following steps: 

1.  Copy the pull request code into a new branch on the avocano repo, using the pull request user and their branch name as inputs
   * This process is similar to the process for merging a pull request via the `git` cli. 
   * The user and branch name are found in the form `user:branch_name` in the head of any pull request ("user wants to merge N commits into GoogleCloudPlatform:main from user:branch")

```bash
cd /path/to/GoogleCloudPlatform/avocano
git checkout -b ${USER}-${BRANCH_NAME} main
git pull git@github.com:${USER}/avocano.git ${BRANCH_NAME}
git push -u origin ${USER}-${BRANCH_NAME}
```

1. In Cloud Build, go to [Triggers](https://console.cloud.google.com/cloud-build/triggers?project=avocano-preview) and click "Run". 
1. In the "Run trigger" side panel, enter the branch name just created. 
   * This should auto-populate after removing the default "main" value. 
1. Populate the `_RUN_TESTS` variable (any value will do) to also run playwright tests. 
1. Click **Run trigger**. 


The trigger will run `cloudbuild.yaml` with the code in the pull request against the `avocano-preview` deployment, and the status of the check will be updated against the HEAD commit (which will also then show up against the pull request checks.)

Ensure that after changes are merged that the branch is removed, to clear the branches and auto-complete for the next test. 
