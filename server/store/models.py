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


from decimal import Decimal

from colorfield.fields import ColorField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=64)
    image = models.ImageField(upload_to="photos", blank=True, null=True)
    description = models.CharField(max_length=1000)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    active = models.BooleanField()
    discount_percent = models.IntegerField()
    inventory_count = models.IntegerField()

    @property
    def discount_saving(self):
        return Decimal(round(float(self.price) * (self.discount_percent / 100), 2))

    @property
    def discount_price(self):
        return "{0:.2f}".format(self.price - self.discount_saving)

    def __str__(self):
        return self.name

    ## If product is active, set all other products as inactive
    def save(self, *args, **kwargs):
        if self.active:
            qs = type(self).objects.filter(active=True)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            qs.update(active=False)

        super(Product, self).save(*args, **kwargs)


class Testimonial(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    reviewer_name = models.CharField(max_length=64)
    reviewer_location = models.CharField(max_length=100)
    rating = models.IntegerField(
        default=5, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    summary = models.CharField(max_length=1000)
    description = models.CharField(max_length=5000)

    def __str__(self):
        return f"{self.rating} star review on {self.product_id.name} from {self.reviewer_name}"


class Transaction(models.Model):
    datetime = models.DateTimeField()
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    unit_price = models.DecimalField(decimal_places=2, max_digits=10)

    def __str__(self):
        return f"{self.datetime} - {self.product_id}"


def google_font_help():
    return "Any valid <a href='https://fonts.google.com/' target='_blank'>Google Font name</a>. Dynamically loaded at runtime."


class SiteConfig(models.Model):
    active = models.BooleanField(default=True)
    color_primary = ColorField(
        default="#C200C2", help_text="For the site banner gradient"
    )
    color_secondary = ColorField(default="#BE0000", help_text="For headings")
    color_action = ColorField(default="#00AFAF", help_text="Fill for buttons")
    color_action_text = ColorField(default="#000000", help_text="Text for buttons")
    site_name = models.CharField(max_length=200, default="Simulatum")
    site_name_color = ColorField(default="#0D8645")
    site_name_font = models.CharField(
        max_length=100, default="Pacifico", help_text=google_font_help()
    )
    base_font = models.CharField(
        max_length=100, default="Tahoma", help_text=google_font_help()
    )

    def __str__(self):
        return f"{self.site_name} configuration"

    ## Only allow one active SiteConfig
    def save(self, *args, **kwargs):
        if self.active:
            qs = type(self).objects.filter(active=True)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            qs.update(active=False)

        super(SiteConfig, self).save(*args, **kwargs)
