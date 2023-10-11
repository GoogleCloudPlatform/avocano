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
import styles from './styles/error.js';

const sadimage = new URL('../../assets/sad-avocado.png', import.meta.url).href;

export class Error extends LitElement {
  static get properties() {
    return {
      apiError: { type: Object },
    };
  }

  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div class="errorContainer">
        <div class="errorLeft">
          <div class="errorImage"><img src=${sadimage} /></div>
        </div>
        <div class="errorDetails">
          <h1>Oh no-vocado!</h1>
          <div class="errorMessage">${this.apiError.message}</div>
          <div class="errorURL">
            <a href="${this.apiError.url}" target="_blank"
              >${this.apiError.url}</a
            >
          </div>
          <div class="errorError">${this.apiError.error}</div>
          <div class="errorError">${this.apiError.extra_error}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-error', Error);
