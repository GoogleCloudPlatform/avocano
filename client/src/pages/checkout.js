// Copyright 2022 Google LLC
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

import { LitElement, html } from 'lit';
import { checkout } from '../utils/fetch.js';
import styles from './styles/checkout.js';
import cache from '../utils/cache.js';

export class Checkout extends LitElement {
  static get properties() {
    return {
      cart: { type: Array },
      updateParent: { type: Function },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.updateParent = () => {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  async clearCart(event) {
    event?.preventDefault();
    // Clears idb instance
    await cache.clear();
    // Updates parent shell level component
    this.updateParent();
  }

  async onSubmit(form) {
    if (!(form || this.cart?.length)) {
      throw new Error('Error: Insufficient information to process checkout.');
    }

    let payload = {
      customer: {
        email: form.get('email'),
      },
      payment: {
        method: form.get('type'),
      },
      items: this.cart,
    };

    return await checkout(payload);
  }

  render() {
    return html`
      <div class="checkoutContainer">
        <h1 class="checkoutTitle">Checkout</h1>
        <div class="checkoutWrapper">
          <div class="checkoutPanel">
            <h2>Cart</h2>
            <!-- Cart -->
            ${this.cart.length
              ? this.cart.map(
                  item =>
                    html`<app-cart-item .productItem=${item}></app-cart-item>`
                )
              : html`<p>No items in cart</p>`}

            <!-- Clear Cart Button -->
            ${this.cart.length
              ? html`<mwc-button
                  label="Clear Cart"
                  slot="primaryAction"
                  @click="${this.clearCart}"
                ></mwc-button>`
              : ''}
          </div>
          <div class="checkoutPanel">
            <h2>Delivery</h2>
            <div class="cartTotalWrapper">
              <span>
                Cart Total:
                $${this.cart.reduce(
                  (acc, item) => (acc += item.count * item.discount_price),
                  0
                )}
              </span>
            </div>
            <app-checkout-form .onSubmit=${this.onSubmit}></app-checkout-form>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-checkout', Checkout);
