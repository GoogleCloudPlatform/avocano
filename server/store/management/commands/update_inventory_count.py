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


from django.core.management.base import BaseCommand, CommandParser

from store.models import Product


class Command(BaseCommand):
    help = "Updates the inventory count for the active product. "

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("--add", type=int)

    def handle(self, *args, **options):
        add = options["add"] or 10
        product = Product.objects.filter(active=True).last()
        product.inventory_count += add
        product.save()
