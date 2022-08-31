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

from store.models import SiteConfig


class Command(BaseCommand):
    help = "Create new active site config"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("--color-primary", type=str)
        parser.add_argument("--color-secondary", type=str)
        parser.add_argument("--color-action", type=str)
        parser.add_argument("--color-action-text", type=str)
        parser.add_argument("--site-name", type=str)
        parser.add_argument("--site-name-color", type=str)
        parser.add_argument("--site-name-font", type=str)
        parser.add_argument("--base-font", type=str)

    def handle(self, *args, **options):

        # Deacivate any existing active site configs
        SiteConfig.objects.filter(active=True).update(active=False)

        product = SiteConfig.objects.create(
            active=True,
            site_name=options["site_name"],
            color_primary=options["color_primary"]
            or SiteConfig._meta.get_field("color_primary").get_default(),
            color_secondary=options["color_secondary"]
            or SiteConfig._meta.get_field("color_secondary").get_default(),
            color_action=options["color_action"]
            or SiteConfig._meta.get_field("color_action").get_default(),
            color_action_text=options["color_action_text"]
            or SiteConfig._meta.get_field("color_action_text").get_default(),
            site_name_color=options["site_name_color"]
            or SiteConfig._meta.get_field("site_name_color").get_default(),
            site_name_font=options["site_name_font"]
            or SiteConfig._meta.get_field("site_name_font").get_default(),
            base_font=options["base_font"]
            or SiteConfig._meta.get_field("base_font").get_default(),
        )
