# Django self-determined URL for CSRF

For Django's CSRF protections, you need to have Django know the host it's being served on.

You can set this manually with environment variables, but you can also interrogate the [metadata server](https://cloud.google.com/run/docs/container-contract#metadata-server) and [environment variables](https://cloud.google.com/run/docs/container-contract#services-env-vars) available by default to determine this information. 

The implementation of this can be found in the [`get_service_url`](https://github.com/GoogleCloudPlatform/avocano/search?q=get_service_url) method. It also requires the service has [permissions to view it's own metadata](server_introspection). 