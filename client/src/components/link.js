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
import { navigator } from 'lit-element-router';
import styles from './styles/link.js';

export class NavLink extends navigator(LitElement) {
  static get properties() {
    return {
      href: { type: String },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.href = '';
  }

  onClick(event) {
    event?.preventDefault();
    this.navigate(this.href);
  }

  render() {
    return html`
      <a href="${this.href}" @click="${this.onClick}">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('app-link', NavLink);
