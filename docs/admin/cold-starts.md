# Improve cold starts 

Cloud Run comes with a number of settings that can improve performance around cold starts. These
aren't set by default, as these settings can increase the running costs of the service. 

To prevent cold starts, Cloud Run supports setting [minimum instances](https://cloud.google.com/run/docs/configuring/min-instances). If the minimum instance is set to "1", Cloud Run will always be running, and never start cold, thus eliminating this performance issue. Check the [Cloud Run pricing](https://cloud.google.com/run/pricing) before configuring this setting.  

In general, there are a number of configurations that can be customized to improve performance: 

* configuring [startup CPU boost](https://cloud.google.com/run/docs/configuring/services/cpu#startup-boost) may help for startup processes
* setting [CPU always allocated](https://cloud.google.com/run/docs/configuring/cpu-allocation)
* increasing the memory and CPU limits on either [Cloud Run](https://cloud.google.com/run/docs/configuring/services/memory-limits) or [Cloud SQL](https://cloud.google.com/sql/docs/postgres/instance-settings#cpus)

See where Avocano was featured in the [Google Cloud Next '23 Developer Keynote](https://youtu.be/268jdNwH6AM?t=1629), and cold starts discussed. 