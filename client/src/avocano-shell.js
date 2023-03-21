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
import { router } from 'lit-element-router';
import { getSiteConfig } from './utils/fetch.js';
import routes from './utils/routes.js';
import styles from './styles/shell.js';

// Pages
import './pages/home.js';
import './pages/checkout.js';
import './pages/contact.js';
import './pages/product.js';
import './pages/product-list.js';
import './pages/shipping.js';
import './pages/not-found.js';

// Components
import './components/header.js';
import './components/footer.js';
import './components/main.js';

// Material design
import '@material/mwc-button';
import '@material/mwc-dialog';

export class AvocanoShell extends router(LitElement) {
  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
    };
  }

  static get routes() {
    return routes;
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.state = {
      config: {},
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    const config = await getSiteConfig();

    // Set django site config properties as
    // global variables for our css to leverage
    this.style.setProperty('--color-primary', config.color_primary);
    this.style.setProperty('--color-secondary', config.color_secondary);
    this.style.setProperty('--color-action', config.color_action);
    this.style.setProperty('--color-action-text', config.color_action_text);
    this.style.setProperty('--site-name-color', config.site_name_color);
    this.style.setProperty('--site-name-font', config.site_name_font);
    this.style.setProperty('--base-font', config.base_font);

    this.state.config = config;

    this.requestUpdate();
  }

  router(route, params) {
    this.route = route;
    this.params = params;
  }

  render() {
    const { config } = this.state;

    /* Dynamically pull fonts we require */
    if (window.WebFont) {
      window.WebFont.load({
        google: {
          families: [config.base_font, config.site_name_font],
        },
      });
    }
    return html`
      <app-header .headerTitle=${config.site_name}></app-header>
      <app-main active-route=${this.route}>
        <div class="route" route="home">
          <app-home></app-home>
        </div>
        <div class="route" route="product">
          <app-product .productId=${parseInt(this.params.id, 10)}></app-product>
        </div>
        <div class="route" route="product-list">
          <app-product-list></app-product-list>
        </div>
        <div class="route" route="shipping">
          <app-shipping></app-shipping>
        </div>
        <div class="route" route="contact">
          <app-contact></app-contact>
        </div>
        <div class="route" route="checkout">
          <app-checkout></app-checkout>
        </div>
        <div class="route" route="not-found">
          <app-not-found></app-not-found>
        </div>
      </app-main>
      <app-footer></app-footer>
    `;
  }
}

customElements.define('avocano-shell', AvocanoShell);
