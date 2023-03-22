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

class CheckoutForm extends LitElement {
  static properties() {
    return {
      onSubmit: { type: Function },
    };
  }

  constructor() {
    super();
    this.onSubmit = () => {};
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    if (event) {
      event.preventDefault();
    }
    this.onSubmit(this.shadowRoot.querySelector('form'));
  }

  render() {
    return html`<form @submit=${this.submitForm}>
      <div class="formControls">
        <mwc-textarea
          outlined
          name="email"
          label="email"
          helper="foo@bar.com"
          rows="1"
        ></mwc-textarea>
        <mwc-select name="type" label="Payment Type">
          <mwc-list-item></mwc-list-item>
          <mwc-list-item selected value="credit">Credit</mwc-list-item>
          <mwc-list-item value="collect">Collect</mwc-list-item>
        </mwc-select>
        <button type="submit" class="fillButton button">Purchase</button>
      </div>
    </form>`;
  }
}

customElements.define('app-checkout-form', CheckoutForm);
