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
import styles from './styles/header.js';
import './link.js';

export class Header extends LitElement {
  static get properties() {
    return {
      headerTitle: { type: String },
    };
  }

  static get styles() {
    return styles;
  }

  render() {
    document.title = this.headerTitle;
    return html`
      <div class="header">
        <h1><a href="/">${this.headerTitle || 'Simulatum'}</a></h1>
        <div class="navigationBar">
          <app-link href="/products">Products</app-link>
          <app-link href="/shipping">Shipping</app-link>
          <app-link href="/contact">Contact</app-link>
          <app-link href="/checkout">Checkout</app-link>
        </div>
      </div>
    `;
  }
}

customElements.define('app-header', Header);
