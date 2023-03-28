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

import { LitElement, html } from 'lit';
import { checkout } from '../utils/fetch.js';
import styles from './styles/checkout.js';
import cache from '../utils/cache.js';
import { getCartPayload } from '../helpers/checkout.js';

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

    this.state = {
      openSuccessDialog: false,
      checkoutErrors: undefined, // Stating this explicity for page
    };

    // Bind "this" component to functions
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleSuccessDialog = this.toggleSuccessDialog.bind(this);
    this.setCheckoutErrors = this.setCheckoutErrors.bind(this);

    // Initial default for updateParent
    // Trigger parent components update lifecycle
    this.updateParent = () => {};
  }

  async clearCart(event) {
    event?.preventDefault();
    // Clears idb instance
    await cache.clear();
    // Updates parent shell level component
    this.updateParent();
  }

  toggleSuccessDialog() {
    this.state.openSuccessDialog = !this.state.openSuccessDialog;
    this.requestUpdate();
  }

  setCheckoutErrors(errors) {
    this.state.checkoutErrors = errors;
    this.requestUpdate();
  }

  async onSubmit(form) {
    if (!(form || this.cart?.length)) {
      throw new Error('Error: Insufficient information to process checkout.');
    }

    let items = getCartPayload(this.cart);
    let payload = {
      customer: {
        email: form.get('email'),
      },
      payment: {
        method: form.get('type'),
      },
      items,
    };

    let response;
    let errors;
    // Only process when there are items in cart
    if (items.length) {
      try {
        response = await checkout(payload);
      } catch (e) {
        errors = e;
      }

      if (response?.errors || errors) {
        this.setCheckoutErrors(response?.errors || errors);
      } else {
        this.clearCart();
        this.toggleSuccessDialog();
      }
    }
  }

  render() {
    const { openSuccessDialog, checkoutErrors } = this.state;

    return html`
      <div class="checkoutContainer">
        <h1 class="checkoutTitle">Checkout</h1>
        <div class="checkoutWrapper">
          <div class="checkoutPanel">
            <h2>Cart</h2>
            <!-- Render cart list -->
            ${this.cart?.length
              ? this.cart.map(
                  item =>
                    html`<app-cart-item .productItem=${item}></app-cart-item>`
                )
              : html`<p>No items in cart</p>`}
            <!-- Clear Cart Button -->
            ${this.cart?.length
              ? html`<mwc-button
                  label="Clear Cart"
                  @click="${this.clearCart}"
                ></mwc-button>`
              : ''}
          </div>
          <div class="checkoutPanel">
            <h2>Delivery</h2>
            <!-- Cart price total -->
            <div class="cartTotalWrapper">
              <span>
                Cart Total:
                $${Number.parseFloat(
                  this.cart?.reduce(
                    (acc, item) => (acc += item.count * item.discount_price),
                    0
                  ) || 0
                ).toFixed(2)}
              </span>
            </div>
            <!-- Checkout Form -->
            <app-checkout-form .onSubmit=${this.onSubmit}></app-checkout-form>
          </div>
        </div>
        ${openSuccessDialog
          ? html`<app-checkout-dialog
              .isSuccess=${true}
              .onClose=${this.toggleSuccessDialog}
            ></app-checkout-dialog>`
          : ''}
        ${checkoutErrors
          ? html`<app-checkout-dialog
              .isSuccess=${false}
              .message=${checkoutErrors}
              .onClose=${() => this.setCheckoutErrors()}
            ></app-checkout-dialog>`
          : ''}
      </div>
    `;
  }
}

customElements.define('app-checkout', Checkout);
