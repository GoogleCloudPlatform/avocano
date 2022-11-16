# Provisioing Tests

Tests that are run against a deployment to confirm it works. 

TODO(glasnt) describe. 




## Local dev

```
export CI_PROJECT=[projectid]
python -m pytest
```

`googleapiclient.discovery` requires authentication, so setup a dedicated service account:

```
gcloud iam service-accounts create robot-account \
    --display-name "Robot account"
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
    --member serviceAccount:robot-account@${PROJECT_ID}.iam.gserviceaccount.com \
    --role roles/owner
gcloud iam service-accounts keys create ~/robot-account-key.json \
    --iam-account robot-account@${PROJECT_ID}.iam.gserviceaccount.com
export GOOGLE_APPLICATION_CREDENTIALS=~/robot-account-key.json
```
