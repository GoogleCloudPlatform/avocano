# Log into the Django Admin

To log into the Django Admin, you'll need to get the URL of the API, and the django admin password. 

To get the service URL: 

* In a terminal, query your Cloud Run services: 

    ```bash
    gcloud run services list
    ```
* In the `api` listing, click the URL (it will be in the form `https://pi-projecthash-regioncode.a.run.app`. )

Open the URL in the browser. You will see two links, one to the API and one to the Admin. 

To get the django admin password: 

* In a terminal, query Secret Manager: 

  ```bash
  gcloud secrets versions access latest \
    --secret django_admin_password && echo ""
  ```

**Note**: The password stored in Secret Manager has no new-line character, and if it was printed directly, your terminal prompt may be appended to the password. Using `echo ""` prevents this issue. 

To log into the Django admin: 

 * Click the `/admin` link in the landing page of the service
 * Login using: 
    * Username: `admin`
    * Password: (the value from Secret Manager)

You now have Django admin access. 

