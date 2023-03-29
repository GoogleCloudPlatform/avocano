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
import styles from './styles/checkout-dialog.js';

class CheckoutDialog extends LitElement {
  static properties() {
    return {
      isSuccess: { type: Boolean },
      message: { type: Object },
    };
  }

  static get styles() {
    return styles;
  }

  render() {
    const { isSuccess, message } = this;
    const { payment, items, general } = message || {};

    return html`
      <mwc-dialog open>
        ${isSuccess
          ? html` <div class="dialogWrapper">
              <h2>Hooray! ⭐</h2>
              <div>We've successfully processed your purchase request.</div>
              <div>
                (This is just a sample.)
                <div>${message}</div>
              </div>
            </div>`
          : html` <div class="dialogWrapper">
              <h2>Oh no! 😭</h2>
              <div>Unable to complete your checkout.</div>
              <div class="errors">
                <div>${message?.payment?.method}</div>
                <div>
                  ${message?.items?.map(product =>
                    product.items || product.status
                      ? html`<div>
                          ${`Product Id: ${
                            product.items?.id
                          } (${product.status?.[0]?.split('_')?.join(' ')})`}
                        </div>`
                      : ``
                  ) || message}
                </div>
              </div>
            </div>`}
        <mwc-button
          label="Close"
          class="dialogButton"
          slot="primaryAction"
          @click="${this.onClose}"
        >
        </mwc-button>
      </mwc-dialog>
    `;
  }
}

customElements.define('app-checkout-dialog', CheckoutDialog);
