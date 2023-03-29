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
import { fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../src/pages/checkout.js';

describe('Checkout', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<app-checkout></app-checkout>`);
  });

  it('renders title element correctly', () => {
    const titleElement = element.shadowRoot.querySelector(
      '.checkoutContainer > .checkoutTitle'
    );
    expect(titleElement).to.exist;
    expect(titleElement.textContent).to.equal('Checkout');
  });

  describe('renders cart panel: ', () => {
    let parentElement;

    beforeEach(async () => {
      parentElement = await fixture(html`<app-checkout></app-checkout>`);
    });

    it('renders title element correctly', () => {
      const childElement = parentElement.shadowRoot.querySelector(
        '.checkoutContainer > .checkoutWrapper >.checkoutPanel:first-child'
      );

      const titleElement = childElement.querySelector('h2');
      expect(titleElement).to.exist;
      expect(titleElement.textContent).to.equal('Cart');
    });

    it('empty state correctly', () => {
      const childElement = parentElement.shadowRoot.querySelector(
        '.checkoutContainer > .checkoutWrapper >.checkoutPanel:first-child'
      );

      const emptyListElement = childElement.querySelector('p');
      expect(emptyListElement).to.exist;
      expect(emptyListElement.textContent).to.equal('No items in cart');

      const clearBtnElement = childElement.querySelector('mwc-button');
      expect(clearBtnElement).to.not.exist;
    });

    it('stocked state correctly', async () => {
      // Stub out cart
      const mockCart = [
        { name: 'hello', count: 2, id: 2 },
        { name: 'world', count: 3, id: 1 },
      ];
      const cartStub = sinon.stub(parentElement, 'cart').value(mockCart);
      const clearStub = sinon.stub(parentElement, 'clearCart');

      // Updates checkout page with stubs
      parentElement.requestUpdate();
      await parentElement.updateComplete;

      const childElement = parentElement.shadowRoot.querySelector(
        '.checkoutContainer > .checkoutWrapper >.checkoutPanel:first-child'
      );

      const listElement = childElement.querySelector('app-cart-item');
      expect(listElement).to.exist;
      expect(listElement.textContent).to.equal('');

      const clearBtnElement = childElement.querySelector('mwc-button');
      expect(clearBtnElement).to.exist;
      clearBtnElement.click();
      expect(clearStub).to.have.callCount(1);
    });
  });

  describe('renders delivery panel: ', () => {
    let parentElement;

    beforeEach(async () => {
      parentElement = await fixture(html`<app-checkout></app-checkout>`);
    });

    it('title element correctly', () => {
      const childElement = parentElement.shadowRoot.querySelector(
        '.checkoutContainer > .checkoutWrapper >.checkoutPanel:last-child'
      );

      const titleElement = childElement.querySelector('h2');
      expect(titleElement).to.exist;
      expect(titleElement.textContent).to.equal('Delivery');
    });

    it('form element correctly', async () => {
      // Stub out cart
      const mockCart = [
        { count: 1, id: 2, discount_price: 1 },
        { count: 1, id: 1, discount_price: 1 },
      ];
      const cartStub = sinon.stub(parentElement, 'cart').value(mockCart);

      // Updates checkout page with stubs
      parentElement.requestUpdate();
      await parentElement.updateComplete;

      const childElement = parentElement.shadowRoot.querySelector(
        '.checkoutContainer > .checkoutWrapper >.checkoutPanel:last-child'
      );

      const cartTotalElement = childElement.querySelector('.cartTotalWrapper');
      expect(cartTotalElement.textContent).to.contains('Cart Total:');
      expect(cartTotalElement.textContent).to.contains('2.00');

      const formElement = childElement.querySelector('app-checkout-form');
      expect(formElement).to.exist;
    });
  });
});
