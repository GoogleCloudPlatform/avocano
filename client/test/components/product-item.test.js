// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { html } from 'lit';
import { waitUntil, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import config from '../../src/utils/config.js';

import '../../src/components/product-item.js';

describe('ProductItem', () => {
  let mockItem, mockState, configStub;

  before(() => {
    mockItem = { name: 'hello' };
    mockState = { count: 1 };
    configStub = sinon.stub(config, 'getConfig');
  });

  it('renders default buy related features correctly', async () => {
    // Set flag to "buynow" to show single purchase features
    configStub.callsFake(() => ({ AVOCANO_PURCHASE_MODE: 'buynow' }));

    const element = await fixture(
      html`<app-product-item
        .state=${mockState}
        .productItem=${mockItem}
      ></app-product-item>`,
    );

    // Ensure properties have been applied to component
    await waitUntil(
      () => element.productItem && element.state,
      'Element did not become ready',
    );

    // Stubbing out buyProduct() to test click
    const buyProductStub = sinon.stub(element, 'buyProduct');

    // Update component so stub is in place
    element.requestUpdate();
    await element.updateComplete;

    // Retrieve title element
    const titleElement = element.shadowRoot.querySelector(
      '.productItemContent > h2',
    );
    // Retrieve button element
    const buyButton = element.shadowRoot.querySelector(
      '.productItemContent > .buyButton',
    );

    // Asset title element with correct name exists
    expect(titleElement).to.exist;
    expect(titleElement.textContent).to.equal(mockItem.name);

    // Assert buttons exist with correct text
    expect(buyButton).to.exist;
    expect(buyButton.textContent).to.equal('Buy');

    // Trigger buy button click
    buyButton.click();

    // Assert correct function was called
    expect(buyProductStub).to.have.callCount(1);
  });

  it('renders cart-related features correctly', async () => {
    // Set flag to "cart" to display cart related features of app
    configStub.callsFake(() => ({ AVOCANO_PURCHASE_MODE: 'cart' }));

    const element = await fixture(
      html`<app-product-item
        .state=${mockState}
        .productItem=${mockItem}
      ></app-product-item>`,
    );

    // Ensure properties have been applied to component
    await waitUntil(
      () => element.productItem && element.state,
      'Element did not become ready',
    );

    // Stubbing out addToCart() to test click
    const addToCartStub = sinon.stub(element, 'addToCart');

    // Update component so stub is in place
    element.requestUpdate();
    await element.updateComplete;

    // Retrieve cart button element
    const cartButton = element.shadowRoot.querySelector(
      '.productItemContent > .cartButton',
    );

    // Assert button exists in with cart flag applied
    expect(cartButton).to.exist;
    expect(cartButton.textContent).to.equal('Add to Cart');

    // Trigger cart button click
    cartButton.click();

    // Assert correct function was called
    expect(addToCartStub).to.have.callCount(1);
  });
});
