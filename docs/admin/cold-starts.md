# Cold Starts


## What is a cold start

A cold start is when a container isn't readily available due to lack of activity, and Cloud Run has to spin up a new one. Spinning up the container will take longer than a pre-warmed idle container.


## Improving cold starts 


Cloud Run comes with a number of settings that can improve performance around cold starts. These
aren't set by default, as these settings can increase the running costs of the service. 

To prevent cold starts, Cloud Run supports setting [minimum instances](https://cloud.google.com/run/docs/configuring/min-instances). If the minimum instance is set to "1", a container instance will always be running, and never start cold, thus eliminating this performance issue. Check the [Cloud Run pricing](https://cloud.google.com/run/pricing) before configuring this setting.  

In general, there are a number of configurations that can be customized to improve performance: 

* configuring [startup CPU boost](https://cloud.google.com/run/docs/configuring/services/cpu#startup-boost) may help for startup processes
* setting [CPU always allocated](https://cloud.google.com/run/docs/configuring/cpu-allocation)
* increasing the memory and CPU limits on either [Cloud Run](https://cloud.google.com/run/docs/configuring/services/memory-limits) or [Cloud SQL](https://cloud.google.com/sql/docs/postgres/instance-settings#cpus)

Read more about cold starts as part of the [General Cloud Run Development tips](https://cloud.google.com/run/docs/tips/general).

See where Avocano was featured in the [Google Cloud Next '23 Developer Keynote](https://youtu.be/268jdNwH6AM?t=1629), and cold starts discussed. 