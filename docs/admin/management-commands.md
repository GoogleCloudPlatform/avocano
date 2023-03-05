# Management commands

## Available Commands

There are a number of [management commands](https://docs.djangoproject.com/en/stable/howto/custom-management-commands/) available in this application. The help text for each can be retrieved by using `python manage.py` and checking each command under `[store]`: 


### Create a new product

Used by the setup process. 

```
$ python manage.py create_new_product --help
usage: manage.py create_new_product [-h] [options]

Creates new active product, deactivating existing active product

options:
  -h, --help            show this help message and exit
  --name NAME
  --description DESCRIPTION
  --price PRICE
  --discount_percent DISCOUNT_PERCENT
  --inventory_count INVENTORY_COUNT
  --image IMAGE
```

### Create Site Config

Allows for command-based site config updating. 

Not actively used, instead, `demo_config.yaml` is loaded as a fixture. 

```
$ python manage.py create_site_config --help
usage: manage.py create_site_config [-h] [options]

Create new active site config

options:
  -h, --help            show this help message and exit
  --color-primary COLOR_PRIMARY
  --color-secondary COLOR_SECONDARY
  --color-action COLOR_ACTION
  --color-action-text COLOR_ACTION_TEXT
  --site-name SITE_NAME
  --site-name-color SITE_NAME_COLOR
  --site-name-font SITE_NAME_FONT
  --base-font BASE_FONT
```

### Generate testimonials

Used by setup process. By default, it will generate testimonals on all products in the database. 


```
$ python manage.py generate_testimonials --help
usage: manage.py generate_testimonials [-h] [--product PRODUCT] [--count COUNT]

Generates testimonials for products

options:
  -h, --help            show this help message and exit
  --product PRODUCT
  --count COUNT
```

### Update inventory count

Updates the inventory for the current active product 

```
$ python manage.py update_inventory_count --help
usage: manage.py update_inventory_count [-h] [--add ADD]

Updates the inventory count for the active product.

options:
  -h, --help            show this help message and exit
  --add ADD
```

## Running Commands

These commands can be run adhoc by creating Cloud Run jobs referencing these commands. 

For example, your store gets 25 new pieces a day. You could setup a Cloud Run job that you can execute when you receive new stock. 

You'd run the `update_inventory_count` command, with a value of 25. 

To set this up, create a job that runs the command as you would in the command line. The reference to `launcher` is an implementation of buildpacks ([see details](https://cloud.google.com/blog/topics/developers-practitioners/running-database-migrations-cloud-run-jobs))

```
gcloud beta run jobs create update_inventory \
    --image gcr.io/$PROJECT_ID/server \
    --region us-central1 \
    --command launcher \
    --args "python manage.py update_inventory_count --add 25"
```

Then, execute the job whenever you want to update the inventory. 