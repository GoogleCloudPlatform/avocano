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
from django.core.management.base import BaseCommand, CommandParser

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

    def handle(self, *args, **options):
        # Deacivate any existing active products
        Product.objects.filter(active=True).update(active=False)

        product = Product.objects.create(
            name=options["name"],
            description=options["description"],
            price=options["price"],
            active=True,
            discount_percent=options["discount_percent"],
            inventory_count=options["inventory_count"],
        )

        if options["image"]:
            image = open(options["image"], "rb")
            file_ext = pathlib.Path(options["image"]).suffix
            product.image.save(str(product.id) + "_image" + file_ext, image)
