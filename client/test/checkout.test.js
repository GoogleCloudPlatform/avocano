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
import helpers from '../src/helpers/checkout.js';
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
    let element;
    let cartStub;
    let getCartPayloadStub;
    
    beforeEach(async () => {
      //getCartPayloadStub = sinon.stub(helpers, 'getCartPayload').returns([{ countRequested: 2, id: 2}]);
      //cartStub = sinon.stub(element, 'cart').returns([{ countRequested: 2, id: 2}]);
      element = (await fixture(html`<app-checkout></app-checkout>`)).shadowRoot.querySelector('.checkoutContainer > .checkoutWrapper >.checkoutPanel:first-child');
    });
    
    it('empty state correctly', () => {
      const titleElement = element.querySelector('h2');
      expect(titleElement).to.exist;
      expect(titleElement.textContent).to.equal('Cart');
   
      const emptyListElement = element.querySelector('p');
      expect(emptyListElement).to.exist;
      expect(emptyListElement.textContent).to.equal('No items in cart');
      
      const clearBtnElement = element.querySelector('mwc-button');
      expect(clearBtnElement).to.not.exist;
    });
    
    it('stocked state correctly', () => {
      const titleElement = element.querySelector('h2');
      expect(titleElement).to.exist;
      expect(titleElement.textContent).to.equal('Cart');

      const listElement = element.querySelector('app-cart-item');
      expect(listElement).to.exist;
      expect(listElement.textContent).to.equal('');
      
      const clearBtnElement = element.querySelector('mwc-button');
      expect(clearBtnElement).to.exist;
    });
  });
  
  describe('renders delivery panel: ', () => {
    let element;
    
    beforeEach(async () => {
      element = (await fixture(html`<app-checkout></app-checkout>`)).shadowRoot.querySelector('.checkoutContainer > .checkoutWrapper >.checkoutPanel:last-child');
    });
    
    it('checkout form correctly', () => {
      const titleElement = element.querySelector('h2');
      expect(titleElement).to.exist;
      expect(titleElement.textContent).to.equal('Delivery');
    });
  });
});
