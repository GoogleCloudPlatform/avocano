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
import { getProduct } from '../utils/fetch.js';
import styles from './styles/product.js';

import '../components/product-item.js';

export class Product extends LitElement {
  static get properties() {
    return {
      productId: { type: Number },
      updateParent: { type: Function },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.state = {
      status: 'loading',
      productItem: {},
    };

    // Initial value for updateParent
    // Trigger parent components update lifecycle
    this.updateParent = () => {};
  }

  async updated() {
    const prevItem = this.state.productItem;
    let productItem;

    // Fetch the product
    if (this.productId) {
      productItem = await getProduct(this.productId);

      this.state = {
        ...this.state,
        status: 'loaded',
        productItem,
      };

      // Only update if the previously loaded product
      // is different than the requested product
      if (prevItem?.id !== this.productId) {
        this.requestUpdate();
      }
    }
  }

  render() {
    const { status, productItem } = this.state;

    return html`
      <div class="productBase">
        ${status === 'loading'
          ? html`<p>loading...</p>`
          : html`<app-product-item
              .productId="{this.productId}"
              .productItem=${productItem}
              .updateParent=${this.updateParent}
            ></app-product-item>`}
      </div>
    `;
  }
}

customElements.define('app-product', Product);
