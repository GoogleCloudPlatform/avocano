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
import { navigator } from 'lit-element-router';
import { getProductList } from '../utils/fetch.js';
import styles from './styles/product.js';

const noimage = new URL('../../assets/noimage.png', import.meta.url).href;

export class ProductList extends navigator(LitElement) {
  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.title = 'Product List';
    this.state = {
      status: 'loading',
      products: [],
    };
  }

  async firstUpdated(changed) {
    super.firstUpdated(changed);

    let products = await getProductList();

    this.state = {
      status: 'loaded',
      products,
    };

    if (this.state.status === 'loaded') {
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="productContainer">
        <h1 class="productTitle">Product List</h1>
        <div class="productWrapper">
          ${this.state.status === 'loading'
            ? html`<p>loading...</p>`
            : this.state.products.map(
                item =>
                  html`
                    <div
                      class="productItem"
                      @click=${() =>
                        item.id && this.navigate(`/products/${item.id}`)}
                    >
                      <div class="productimageWrapper">
                        <img
                          class="productimage"
                          alt="Product Image"
                          src=${item.image}
                          loading="lazy"
                          onerror=${`this.src='${noimage}';`}
                        />
                      </div>
                      <div class="productItemContent">
                        <div class="itemTitle">${item.name}</div>
                        <div>${`Price: $${item.discount_price}`}</div>
                        <div>
                          ${item.inventory_count
                            ? `Available: ${item.inventory_count}`
                            : `Sold Out!`}
                        </div>
                      </div>
                    </div>
                  `
              )}
        </div>
      </div>
    `;
  }
}

customElements.define('app-product-list', ProductList);
