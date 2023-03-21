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
//import { fulfillCheckout } from '../utils/fetch.js';
import styles from './styles/checkout.js';

export class Checkout extends LitElement {
  static get styles() {
    return styles;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="checkoutBase">
        <div>Checkout</div>
      </div>
    `;
  }
}

customElements.define('app-checkout', Checkout);
