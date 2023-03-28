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
import styles from './styles/checkout-form.js';

class CheckoutForm extends LitElement {
  static properties() {
    return {
      onSubmit: { type: Function },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.onSubmit = () => {};
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      openFormErrorDialog: false,
    };
  }

  toggleFormErrorDialog() {
    this.state.openFormErrorDialog = !this.state.openFormErrorDialog;
    this.requestUpdate();
  }

  async submitForm(event) {
    event?.preventDefault();
    const form = new FormData(this.shadowRoot.querySelector('form') || {});

    if (!this.isValidEmail(form.get('email'))) {
      this.toggleFormErrorDialog();
    }
    return await this.onSubmit(form);
  }

  isValidEmail(text) {
    return /[^ @]*@[^ @]*/.test(text);
  }

  render() {
    const { openFormErrorDialog } = this.state;

    return html` <div>
      <form @submit=${this.submitForm}>
        <div class="formControls">
          <mwc-textfield
            outlined
            required
            autoValidate
            name="email"
            helper="foo@bar.com"
            pattern="[^ @]*@[^ @]*"
            placeholder="Enter your email"
            validationMessage="Field is required"
          ></mwc-textfield>
          <mwc-select
            name="type"
            label="Payment Type"
            required
            validationMessage="Field is required"
          >
            <mwc-list-item selected value="credit">Credit</mwc-list-item>
            <mwc-list-item value="collect">Collect</mwc-list-item>
          </mwc-select>
          <button type="submit" class="checkoutButton">Purchase</button>
        </div>
      </form>
      ${openFormErrorDialog
        ? html`<mwc-dialog open>
            <div class="dialogWrapper">
              Please correctly format email (i.e foo@bar.com).
            </div>
            <mwc-button
              label="Close"
              class="dialogButton"
              slot="primaryAction"
              @click="${this.toggleFormErrorDialog}"
            ></mwc-button>
          </mwc-dialog>`
        : ''}
    </div>`;
  }
}

customElements.define('app-checkout-form', CheckoutForm);
