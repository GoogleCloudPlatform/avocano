# Provisioning Tests

These tests are designed to be run against a deployment. 

They are either run against the current project, or a defined project (using the `CI_PROJECT` value)


## Test scope

These tests use [playwright](https://playwright.dev/), and automate the clicking of website buttons to test client deployments. 

There are also other tests, see `test/` for details. 

## Local dev

Install the dependencies

```
python -m pip install -r test/requirements.txt
playwright install-deps  
playwright install
```

Then run the tests: 

```
python -m pytest
```


`googleapiclient.discovery` requires authentication, so you may need to setup a dedicated service account:

```
gcloud iam service-accounts create robot-account \
    --display-name "Robot account"

# permissions on parent
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member serviceAccount:robot-account@${PROJECT_ID}.iam.gserviceaccount.com \
    --role roles/owner

# permissions on child. 
gcloud projects add-iam-policy-binding ${CI_PROJECT} \
    --member serviceAccount:robot-account@${PROJECT_ID}.iam.gserviceaccount.com \
    --role roles/owner

gcloud iam service-accounts keys create ~/robot-account-key.json \
    --iam-account robot-account@${PROJECT_ID}.iam.gserviceaccount.com
export GOOGLE_APPLICATION_CREDENTIALS=~/robot-account-key.json
```
