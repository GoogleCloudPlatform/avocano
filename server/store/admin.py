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


from django.contrib import admin
from django.utils.html import format_html

from store.models import Product, SiteConfig, Testimonial, Transaction


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "price",
        "discount",
        "inventory_count",
        "active",
    )

    # Display preview of image in admin
    def image_tag(self, obj):
        return format_html('<img src="{}" style="width: 200px"/>'.format(obj.image.url))

    image_tag.short_description = "Product Image Preview"
    readonly_fields = ["image_tag"]

    # Formatted discount display for admin list
    def discount(self, obj):
        return f"{obj.discount_percent}%"


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("datetime", "product_id")


@admin.register(Testimonial)
class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        "product_id",
        "reviewer_name",
        "reviewer_location",
        "rating",
        "summary",
    )


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ("site_name", "active")
    fieldsets = (
        (None, {"fields": ("active", "base_font")}),
        ("Site Header", {"fields": ("site_name", "site_name_color", "site_name_font")}),
        (
            "Colors",
            {
                "fields": (
                    "color_primary",
                    "color_secondary",
                    "color_action",
                    "color_action_text",
                )
            },
        ),
    )
