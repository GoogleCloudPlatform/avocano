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
import { getConfig } from '../utils/config.js';
import { getCartItemTotal } from '../helpers/checkout.js';
import styles from './styles/header.js';
import './link.js';

const cartIcon = new URL('../../assets/shopping_cart.svg', import.meta.url)
  .href;

export class Header extends LitElement {
  static get properties() {
    return {
      headerTitle: { type: String },
      cart: { type: Array },
    };
  }

  static get styles() {
    return styles;
  }

  render() {
    document.title = this.headerTitle;
    const { AVOCANO_PURCHASE_MODE } = getConfig();

    return html`
      <div class="header">
        <h1><a href="/">${this.headerTitle || 'Simulatum'}</a></h1>
        <div class="navigationBar">
          <div class="navigationPanel">
            <app-link href="/products">Products</app-link>
            <app-link href="/shipping">Shipping</app-link>
            <app-link href="/contact">Contact</app-link>
            ${AVOCANO_PURCHASE_MODE === 'cart'
              ? html`<app-link href="/checkout">Checkout</app-link>`
              : ``}
          </div>
          <div class="navigationPanel">
            ${AVOCANO_PURCHASE_MODE === 'cart'
              ? html`<app-link href="/checkout">
                  <div class="shoppingCart">
                    <img
                      class="shoppingCartIcon"
                      alt="Shopping Cart"
                      src=${cartIcon}
                      loading="lazy"
                    />
                    ${this.cart.length
                      ? html`<div class="shoppingCartTotal">
                          ${getCartItemTotal(this.cart)}
                        </div>`
                      : ``}
                  </div>
                </app-link>`
              : ``}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-header', Header);
