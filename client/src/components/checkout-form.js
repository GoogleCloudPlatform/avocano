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
    this.state = {
      disableSubmit: true,
      openFormErrorDialog: false,
    };

    // Bind "this" component to functions
    this.onSubmit = () => {};
    this.submitForm = this.submitForm.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }

  firstUpdated() {
    // Add input change callback for email input
    const email = this.shadowRoot.getElementById('email');
    email.addEventListener('change', this.onEmailChange);
  }

  onEmailChange() {
    const form = new FormData(this.shadowRoot.querySelector('form') || {});
    const isValid = this.isValidEmail(form.get('email'));

    // Disable submit while form is being sent
    this.state.disableSubmit = !isValid;
    this.requestUpdate();
  }

  isValidEmail(text) {
    return /[^ @]*@[^ @]*/.test(text);
  }

  async submitForm(event) {
    event?.preventDefault();

    // Disable submit while form is being sent
    this.state.disableSubmit = true;
    this.requestUpdate();

    const form = new FormData(this.shadowRoot.querySelector('form') || {});

    await this.onSubmit(form);
    // Waiting till callstack is empty to re-enable submit button
    setTimeout(() => {
      this.state.disableSubmit = false;
      this.requestUpdate();
    }, 0);
  }

  render() {
    const { disableSubmit } = this.state;

    return html` <div>
      <form @submit=${this.submitForm}>
        <div class="formControls">
          <mwc-textfield
            outlined
            required
            autoValidate
            id="email"
            name="email"
            label="Enter your email"
            helper="foo@bar.com"
            pattern="[^ @]*@[^ @]*"
            placeholder="Enter your email"
            validationMessage="Requires email format."
          ></mwc-textfield>
          <mwc-select
            name="type"
            label="Payment Type"
            required
            validationMessage="Field is required"
          >
            <mwc-list-item selected value="collect">Collect</mwc-list-item>
            <mwc-list-item value="credit">Credit</mwc-list-item>
          </mwc-select>
          ${disableSubmit
            ? html`<button disabled type="submit" class="checkoutButton">
                Purchase
              </button>`
            : html`<button type="submit" class="checkoutButton">
                Purchase
              </button>`}
        </div>
      </form>
    </div>`;
  }
}

customElements.define('app-checkout-form', CheckoutForm);
