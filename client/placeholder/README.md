# Placeholder

*Note*: This placeholder is not used in the deployment self-contained in this repo, but in another project. 

This folder is designed to hold a static page that can be deployed to Firebase as a placeholder until the real website is deployed. 

Features: 

 * replaces the "Site Not Found" 404 page with a placeholder
 * page set to automatically refresh every 5 seconds
 * uses embedded image (like the "Site Not Found" does) to prevent image loading flickering. 

This placeholder is built in `/provisioning/placeholder-image.cloudbuild.json`, automatically built and deployed using Cloud Build triggers for use in the Jump Start Solution terraform. 