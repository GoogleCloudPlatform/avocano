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
import { getActiveProduct } from '../utils/fetch.js';
import cache from '../utils/cache.js';
import styles from './styles/home.js';
import '../components/product-item.js';

export class Home extends LitElement {
  constructor() {
    super();
    this.title = 'Home';
    this.state = {
      status: 'loading',
      productItem: {},
    };
  }

  static get styles() {
    return styles;
  }

  async disconnectedCallback() {
    super.disconnectedCallback();
    cache.deleteDB();
  }

  async firstUpdated() {
    const productItem = await getActiveProduct();

    this.state = {
      ...this.state,
      status: 'loaded',
      productItem,
    };

    this.requestUpdate();
  }

  render() {
    const { status, productItem } = this.state;

    return html`
      <div class="homeBase">
        ${status === 'loading'
          ? html`<p>loading...</p>`
          : html`<app-product-item
              .productId="{this.productId}"
              .productItem=${productItem}
            ></app-product-item>`}
      </div>
    `;
  }
}

customElements.define('app-home', Home);
