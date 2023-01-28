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
import styles from './styles/contact.js';

export class Contact extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`
      <div class="contactContainer">
        <h1>Contact</h1>
        <div class="contactWrapper">
          This website was deployed from sample code in the
          <a href="https://github.com/GoogleCloudPlatform/avocano"
            >GoogleCloudPlatform/avocano</a
          >
          repo on GitHub.
        </div>
      </div>
    `;
  }
}

customElements.define('app-contact', Contact);
