#!/usr/bin/python
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


import pathlib

from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandParser
from django.db import IntegrityError
from store.models import Product


class Command(BaseCommand):
    help = "Creates new active product, deactivating existing active product"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("--name", default="Name", type=str)
        parser.add_argument("--description", default="Description", type=str)
        parser.add_argument("--price", default="0", type=float)
        parser.add_argument("--discount_percent", default="0", type=int)
        parser.add_argument("--inventory_count", default="0", type=int)
        parser.add_argument("--image", type=str)
        parser.add_argument("--testimonials", default="0", type=int)

    def handle(self, *args, **options):
        name = options["name"]

        # nicely handle uniqueness constraints
        product, created = Product.objects.get_or_create(
            name=name,
            defaults={
                "description": options["description"],
                "price": options["price"],
                "active": True,
                "discount_percent": options["discount_percent"],
                "inventory_count": options["inventory_count"],
            },
        )

        if created:
            # Deactivate any existing active products, except for this one.
            Product.objects.filter(active=True).exclude(name=name).update(active=False)

            if options["image"]:
                image = open(options["image"], "rb")
                file_ext = pathlib.Path(options["image"]).suffix
                product.image.save(str(product.id) + "_image" + file_ext, image)

            self.stdout.write(f"Created product '{name}'")

            # Generate testimonials
            if options["testimonials"] > 0:
                call_command(
                    "generate_testimonials",
                    product=product.id,
                    count=options["testimonials"],
                )
        else:
            self.stdout.write(f"Product '{name}' already exists.")
