#!/bin/bash -eu
#
# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This script should be run first time the server is deployed to prime the database. 

# Run migrations and static.
python3 manage.py migrate
python3 manage.py collectstatic --noinput --clear

# Load configurations
python3 manage.py loaddata demo_config.yaml

# Create products through management commands.
ls store/fixtures/media

python3 manage.py create_new_product \
    --name "Pineapple Bee" \
    --image "store/fixtures/media/pineapple-bee.png" \
    --description "This lil guy is buzzing with excitement, ready to lead the next disco samba!" \
    --price "25.00" \
    --discount 17 \
    --inventory_count 27

python3 manage.py create_new_product \
    --name "Wooden Tiger" \
    --image "store/fixtures/media/log-tiger.png" \
    --description "Hand-carved from oak, this king of the jungle will bring joy to children young and old." \
    --price "7.49" \
    --inventory_count 4

python3 manage.py create_new_product \
    --name "Star Unicorn" \
    --image "store/fixtures/media/unicorn-star.png" \
    --description "This inflatable unicorn will bring delight to your next family gathering." \
    --price "12.49" \
    --inventory_count 71

# Last added entry is the active product
python3 manage.py create_new_product \
    --name "Sparkly Avocado" \
    --image "store/fixtures/media/avocado-star.png" \
    --description "Never before has an avocado been as sparkly. Sure to be a star ingredient in your next salad." \
    --price "2.99" \
    --discount "14" \
    --inventory_count 42

# Generate some random testimonials
python3 manage.py generate_testimonials