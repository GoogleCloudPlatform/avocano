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


import colorfield.fields
import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0001_create_superuser"),
    ]

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=64)),
                ("image", models.ImageField(blank=True, null=True, upload_to="photos")),
                ("description", models.CharField(max_length=1000)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("active", models.BooleanField()),
                ("discount_percent", models.IntegerField()),
                ("inventory_count", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="Transaction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("datetime", models.DateTimeField()),
                ("unit_price", models.DecimalField(decimal_places=2, max_digits=10)),
                (
                    "product_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="store.product"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Testimonial",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("reviewer_name", models.CharField(max_length=64)),
                (
                    "rating",
                    models.IntegerField(
                        default=5,
                        validators=[
                            django.core.validators.MinValueValidator(1),
                            django.core.validators.MaxValueValidator(5),
                        ],
                    ),
                ),
                ("summary", models.CharField(max_length=1000)),
                ("description", models.CharField(max_length=5000)),
                (
                    "product_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="store.product"
                    ),
                ),
                ("reviewer_location", models.CharField(default="asdf", max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="SiteConfig",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "color_primary",
                    colorfield.fields.ColorField(
                        default="#C200C2",
                        help_text="For the site banner gradient",
                        image_field=None,
                        max_length=18,
                        samples=None,
                    ),
                ),
                (
                    "color_secondary",
                    colorfield.fields.ColorField(
                        default="#BE0000",
                        help_text="For headings",
                        image_field=None,
                        max_length=18,
                        samples=None,
                    ),
                ),
                ("site_name", models.CharField(default="Simulatum", max_length=200)),
                (
                    "site_name_font",
                    models.CharField(
                        default="Pacifico",
                        help_text="Any valid <a href='https://fonts.google.com/ target=_blank'>Google Font name</a>. Dynamically loaded at runtime.",
                        max_length=100,
                    ),
                ),
                (
                    "base_font",
                    models.CharField(
                        default="Tahoma",
                        help_text="Any valid <a href='https://fonts.google.com/ target=_blank'>Google Font name</a>. Dynamically loaded at runtime.",
                        max_length=100,
                    ),
                ),
                ("active", models.BooleanField(default=True)),
                (
                    "color_action",
                    colorfield.fields.ColorField(
                        default="#00AFAF",
                        help_text="Fill for buttons",
                        image_field=None,
                        max_length=18,
                        samples=None,
                    ),
                ),
                (
                    "site_name_color",
                    colorfield.fields.ColorField(
                        default="#0D8645", image_field=None, max_length=18, samples=None
                    ),
                ),
                (
                    "color_action_text",
                    colorfield.fields.ColorField(
                        default="#000000",
                        help_text="Text for buttons",
                        image_field=None,
                        max_length=18,
                        samples=None,
                    ),
                ),
            ],
        ),
    ]
