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

```
# Deployed container
export API_URL=https://api-HASH-REGION.a.run.app/

# Locally running (already default in app)
export API_URL=http://localhost:8000
```

### Install, build, and start client

In another tab, execute the following.

```bash
# Install app dependencies
npm i
# Bundle the app
npm run build
# Runs the app locally!
npm run start
```

To run Avocart version of the client.

```bash
AVOCANO_PURCHASE_MODE=cart npm run start
```

Open your browser to `localhost:8000`.

## Test changes in `deploy-preview`


## Deployment

This code is deployed directly in Cloud Build steps, as seen in the root [`cloudbuild.yaml`](/cloudbuild.yaml), and [`provisioning/client.cloudbuild.yaml`](/provisioning/client.cloudbuild.yaml).

It can also be deployed by building an image [`provisioning/client-image.cloudbuild.yaml`](/provisioning/client-image.cloudbuild.yaml), and running as a Cloud Run job, which can be customised by environment variables (see [`docker-deploy.yaml`](docker-deploy.sh))


### Deploy Avocart version

Before executing the root `setup.sh` script, assign the `_PURCHASE_MODE` substitution with value `cart`in [`provisioning/client.cloudbuild.yaml`](/provisioning/client.cloudbuild.yaml) and [`provisioning/client-image.cloudbuild.yaml`](/provisioning/client-image.cloudbuild.yaml)


