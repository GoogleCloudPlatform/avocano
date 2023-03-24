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
import styles from './styles/cart-item.js';

const noimage = new URL('../../assets/noimage.png', import.meta.url).href;

export class CartItem extends LitElement {
  static get properties() {
    return {
      productItem: { type: Object },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.state = {
      productItem: {},
    };
  }

  render() {
    const { name, discount_price, count, image, description } =
      this.productItem || {};

    return html`
      <div
        class="cartItem"
        @click=${() =>
          cartItem?.id && this.navigate(`/products/${cartItem?.id}`)}
      >
        <div class="cartImageWrapper">
          <img
            class="productimage"
            alt="Product Image"
            src=${image}
            style="height: 110px; width: auto;"
            loading="lazy"
            onerror=${`this.src='${noimage}';`}
          />
        </div>
        <div class="cartItemContent">
          <div class="itemTitle">${name}</div>
          <div>${`Price: $${discount_price}`}</div>
          <div>${`Count: ${count}`}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-cart-item', CartItem);
