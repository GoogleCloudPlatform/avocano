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
import styles from './styles/shipping.js';

export class Shipping extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div class="shippingContainer">
        <h1>Shipping</h1>
        <div class="shippingWrapper">
          This website ships no products, but this website was shipped through
          Google Cloud automation.
          <a
            href="https://github.com/GoogleCloudPlatform/avocano/tree/main/docs"
            >Learn more.</a
          >
        </div>
      </div>
    `;
  }
}

customElements.define('app-shipping', Shipping);
