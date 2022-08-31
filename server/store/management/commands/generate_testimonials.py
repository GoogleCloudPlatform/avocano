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


from random import randint

from django.core.management.base import BaseCommand, CommandParser
from faker import Faker
from store.models import Product, Testimonial


class Command(BaseCommand):
    help = "Generates testimonials for products"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("--product", type=int)
        parser.add_argument("--count", type=int)

    def handle(self, *args, **options):
        count = options["count"] or 5
        if options["product"]:
            products = Product.objects.filter(pk=options["product"])
        else:
            products = Product.objects.all()  # Populate all products if not specified.

        fake = Faker(["en_AU", "fr_FR", "pt_PT"])

        for p in products:
            for _ in range(count):

                t = Testimonial(
                    product_id=p,
                    reviewer_name=fake.first_name(),
                    reviewer_location=f"{fake.city()}, {fake.country()}",
                    rating=randint(1, 5),
                    summary=" ".join(fake.words(3)) + "!",
                    description=fake.paragraph(nb_sentences=3),
                )
                t.save()

        print(f"Generated {count} testimonals across {len(products)} products.")
