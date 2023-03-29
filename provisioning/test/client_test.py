import os
import re

import httpx
import pytest
from playwright.sync_api import Page, expect

httpclient = httpx.Client(timeout=15, follow_redirects=True)

purchase_mode = os.environ.get("AVOCANO_PURCHASE_MODE", "")


def test_client_response(firebase_url):
    response = httpclient.get(firebase_url)

    assert response.status_code == 200
    assert "🥑" in response.text


def test_client_content(firebase_url, page: Page):
    page.goto(firebase_url, wait_until="networkidle")

    expect(page).to_have_title(re.compile("Avocano"))

    page_elements = [
        "Sparkly Avocado",
        "Products",
        "Shipping",
        "Contact",
        "Testimonials",
    ]
    for element in page_elements:
        expect(page.locator("body")).to_contain_text(element)


def test_client_interaction(firebase_url, page: Page):
    page.goto(firebase_url, wait_until="networkidle")

    expect(page).to_have_title(re.compile("Avocano"))

    def get_inventory():
        inventory = page.locator(".inventory").inner_text()
        assert "Only" in inventory
        inventory_count = re.findall(r"Only ([0-9]*) left!", inventory)[0]
        assert inventory_count is not None
        inventory_count = int(inventory_count)
        assert inventory_count > 0
        return inventory_count

    original_inventory = get_inventory()

    if purchase_mode == "cart":
        page.get_by_role("link", name="Add to Cart").click()
        expect(page.locator(".dialogWrapper")).to_have_text(
            re.compile("Wonderful news!")
        )
        page.get_by_role("button").click()

        # Inventory not yet taken
        new_inventory = get_inventory()
        assert original_inventory == new_inventory

    else:
        page.get_by_role("link", name="Buy").click()
        expect(page.locator(".dialogWrapper")).to_have_text(re.compile("Oops!"))
        page.get_by_role("button").click()
        new_inventory = get_inventory()
        assert original_inventory - 1 == new_inventory


@pytest.mark.skipif(purchase_mode != "cart", reason="Test on Cart mode only")
def test_cart_interaction(firebase_url, page: Page):
    page.goto(firebase_url, wait_until="networkidle")

    expect(page).to_have_title(re.compile("Avocano"))

    def get_inventory():
        inventory = page.locator(".inventory").inner_text()
        assert "Only" in inventory
        inventory_count = re.findall(r"Only ([0-9]*) left!", inventory)[0]
        assert inventory_count is not None
        inventory_count = int(inventory_count)
        assert inventory_count > 0
        return inventory_count

    original_inventory = get_inventory()

    expect(page).to_have_title(re.compile("Avocano"))
    page.get_by_role("link", name="Add to Cart").click()

    expect(page.locator(".dialogWrapper")).to_have_text(re.compile("Wonderful news!"))
    page.get_by_role("button", name="close").click()
    
    page.goto(firebase_url, wait_until="networkidle")
    expect(page.locator(".shoppingCart")).to_have_text(re.compile("1"))

    # Confirm inventory stock
    new_inventory = get_inventory()
    assert original_inventory == new_inventory

    page.get_by_role("link", name="checkout").click()

    page_elements = ["Checkout", "Cart", "Delivery"]
    for element in page_elements:
        expect(page.locator("body")).to_contain_text(element)

    # Try checkout
    page.get_by_label("Enter your email").fill("foo@bar.com")

    page.get_by_role("combobox", name="Payment Type*").click()
    page.get_by_role("option", name="Credit").click()
    page.get_by_role("button", name="purchase").click()

    # Expect failure
    expect(page.locator(".dialogWrapper")).to_have_text(re.compile("Oh no!"))
    page.get_by_role("button", name="close").click()

    # Actually checkout
    page.get_by_role("combobox", name="Payment Type*").click()
    page.get_by_role("option", name="Collect").click()
    page.get_by_role("button", name="purchase").click()
    expect(page.locator(".dialogWrapper")).to_have_text(re.compile("Hooray!"))

    # Confirm updated inventory
    page.goto(firebase_url, wait_until="networkidle")
    new_inventory = get_inventory()
    assert original_inventory - 1 == new_inventory
