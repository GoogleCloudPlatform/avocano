# Extending the example

If you are wanting to extend this example application, there are some development steps you're going to need to take. 

## Forking the repo, and GitHub actions

Please feel free to fork the repo, but know that there are GitHub Actions attached to the parent repo
that probably won't automatically work with your setup. 

To disable: 

  * Go to your fork's Settings
  * Go to Code and Automation > Actions > General
  * Under "Actions permissions", select "Disable actions".
  * Click **Save**. 

## Terraform needs a backend

This sample opts to use a Cloud Storage bucket to store terraform state, rather than storing the files on your local machine. 
This allows you to invoke Terraform from Cloud Build, Cloud Run jobs, or otherwise, and they all share
the same state. 

If you're running the examples in an environment outside of Cloud Shell, you'll need to be aware that
there was additional parameters added to the initialization of Terraform to store state in Cloud Storage,
rather than your local machine: 

```
terraform init -backend-config="bucket=terraform-${PROJECT_ID}" 
```

This is automatically included in any `terraform init` calls, so if you're calling this yourself, be sure to add it.


## Creating migrations

When automatically generating Django migrations, you'll need to run these on your local machine so you can commit the
results to source. You will follow a fairly standard practice, but you'll provide blank default settings to Django, as these are normally expected in the deployment environment. 

1. Navigate to the `server` directory, and install the Python dependencies
 
    ```bash
    cd server
    pip install -r requirements.txt
    ```
 
1. Generate the Django migration files: 
 
    ```bash
    SECRET_KEY="" DATABASE_URL="" python manage.py makemigrations
    ```
 
    _Ignore any "Engine not recognized from url" warnings._
 
1. Run the standard update process in Cloud Build: 
 
    ```bash
    gcloud builds submit
    ```
 
1. Apply the database migrations using Cloud Run Jobs:
 
    ```bash
    gcloud run jobs execute migrate
    ```
 
Open the linked execution logs to see the output from this command. 

## Local testing

If you need to run the application locally, such as for more complex development tasks, you will need to setup a proxy to the production database, and adjust your Django settings. 


### Setup Cloud SQL Auth Proxy

Follow the [Install instructions](https://cloud.google.com/sql/docs/postgres/sql-proxy#install) for your platform. 

Saving this into your `$PATH` is a useful administration step so you can take advantage of this executable in other projects.

### Start Cloud SQL Auth Proxy

In a new terminal, start the proxy: 

```
cloud_sql_proxy -instances="${PROJECT_ID}:us-central1:psql"=tcp:5432
```

This will redirect this Cloud SQL instance to localhost. Because of this, you'll need to change where Django knows your database to be.

### Copy and edit settings

1. Navigate to the server config: 

    ```
    cd server
    ```

1. Copy the Django settings from Secret Manager to your local `.env` file. 
   Note: this file is `.gitignore`d.

    ```
    gcloud secrets versions access latest --secret django_settings > .env
    ```

1. Edit the `DATABASE_URL` line to replace the `cloudsql` config to `localhost`:

    ```diff
    -DATABASE_URL="postgres://server:password@//cloudsql/yourproject:us-central1:psql/django"
    +DATABASE_URL="postgres://server:password@localhost/django"
    ```

1. Run your code on your local machine: 

    ```
    python manage.py runserver
    ```
    
From here, you can open localhost to see your code running against the production database. 
