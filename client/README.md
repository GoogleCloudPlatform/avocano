# Avocano Frontend

This client app uses [Lit](https://lit.dev/) front-end and [open-wc](https://open-wc.org/) for project scaffolding.

## Technologies

- **Framework:** ⚙️ [Lit](https://lit.dev/)
- **Scaffolding:** 🏗️ [open-wc](https://open-wc.org/)
- **Bundler:** 🖇️ [Rollup](https://rollupjs.org/)
- **Hosting:** 🔥 [Firebase](https://firebase.google.com/)

## Requirements

Requires node 10 & npm 6 or higher, and a running [api server](../server/README.md#local-dev)

## Develop App Locally

### Run API server

To get the API server running, follow the steps documented for the api server and then make sure you set up the environment variable API_URL:

```
# Deployed container
export API_URL=https://api-HASH-REGION.a.run.app/

# Locally running (already default in app)
export API_URL=http://localhost:8000
```

### Install, build, and start client locally

Once you have the API server process running locally, in another terminal tab, execute the following:

```bash
# Install app dependencies
npm i
# Bundle the app
npm run build
# Runs the app locally!
npm run start
```

This will show you the default version of the app, where you can "buy" certain
available products.

Open your browser to `localhost:8081` to explore more.

### Client variants

The default variant of Avocano is an example implementation of a dynamic webapp that when you 
click on Buy, explains that this is not a real product website.

The "Avocart" version of Avocano extends the web app to show implementation of a shopping cart
and checkout process, key requirements for ecommerce sites.

To display the "Avocart" version of the client:

```bash
AVOCANO_PURCHASE_MODE=cart npm run start
```

This will allow you to see the cart feature option of Avocano where you will be able to add 
product items into your "cart" and go through "checkout" process with your items.


## Test changes in `deploy-preview`

If you'd like to review your branch changes in the `deploy-preview` staged environment before merging into the `main` branch, 
follow the [`directions`](../docs/admin/testing-changes.md) provided.

## Deployment

To deploy the default version of Avocano, either run through the root `setup.sh` script or click on the "Open in Cloud Shell" [walkthrough](../README.walkthrough.md) in the root [`README`](../README.md).
Completing this process will provide you with a Firebase hosted site link. To explore more, check out the [`admin documentation`](../docs/admin).

This code is deployed directly in Cloud Build steps, as seen in the root [`cloudbuild.yaml`](/cloudbuild.yaml), and [`provisioning/client.cloudbuild.yaml`](/provisioning/client.cloudbuild.yaml).

It can also be deployed by building the client code into an image, and running as a Cloud Run job (see [tagged-images.cloudbuild.yaml](/provisioning/tagged-images.cloudbuild.yaml)). These can further be customised by environment variables (see [`docker-deploy.yaml`](docker-deploy.sh))

### Deploy Avocart version

Before executing the root `setup.sh` script to deploy your version of Avocart, assign the `_PURCHASE_MODE` substitution with value `cart`in [`provisioning/client.cloudbuild.yaml`](/provisioning/client.cloudbuild.yaml) and [`cloudbuild.yaml`](../cloudbuild.yaml).

 ## FAQs

 1. If you are not seeing your changes reflected, either manually remove your browser cache or open your browser in incognito mode.
