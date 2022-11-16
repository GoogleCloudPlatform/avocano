import re

import httpx
from playwright.sync_api import Page, expect

httpclient = httpx.Client(timeout=15, follow_redirects=True)


def test_client_response(firebase_url):
    response = httpclient.get(firebase_url)

    assert response.status_code == 200
    assert "🥑" in response.text


def test_client_content(firebase_url, page: Page):
    page.goto(firebase_url, wait_until="networkidle")

    expect(page).to_have_title(re.compile("Avocano"))

    page_elements = ["Sparkly Avocado", "Products", "Shipping", "Contact", "Testimonials"]
    for element in page_elements: 
        expect(page.locator("body")).to_contain_text(element)


def test_client_interaction(firebase_url, page: Page):
    page.goto(firebase_url, wait_until="networkidle")

    expect(page).to_have_title(re.compile("Avocano"))

    def get_inventory(): 
        inventory = page.locator(".inventory").inner_text()
        assert "Only" in inventory
        inventory_count = re.findall(r'Only ([0-9]*) left!', inventory)[0]
        assert inventory_count is not None
        inventory_count = int(inventory_count)
        assert inventory_count > 0
        return inventory_count

    original_inventory = get_inventory()

    page.get_by_role("link", name="Buy").click()
    expect(page.locator(".dialogWrapper")).to_have_text(re.compile("Oops!"))
    
    page.get_by_role("button").click()
    
    new_inventory = get_inventory()

    assert original_inventory - 1 == new_inventory
