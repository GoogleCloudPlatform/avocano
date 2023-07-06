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
import { router } from './vendor/lit-element-router-2.0.3a/lit-element-router.js';
import { getSiteConfig } from './utils/fetch.js';
import { getConfig } from './utils/config.js';
import cache from './utils/cache.js';
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
import './pages/error.js';

// Components
import './components/checkout-form.js';
import './components/checkout-dialog.js';
import './components/cart-item.js';
import './components/product-item.js';
import './components/header.js';
import './components/footer.js';
import './components/main.js';

// Material design
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import '@material/mwc-list';
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
      cart: [],
      loading: true,
    };

    this.childUpdateRequest = this.childUpdateRequest.bind(this);
  }

  async connectedCallback() {
    super.connectedCallback();

    const config = await getSiteConfig();
    // Show loading animation only when
    // site config is unavailable
    if (config) {
      if (config.errors) {
        // An error was encountered, pass it along to the UI.
        this.state.apiError = config.errors;

        //this.requestUpdate();
        //return;
      }
      this.state.loading = false;
    }

    if (config?.apiError) {
      // An error was encountered, pass it along to the UI.
      this.state.apiError = config.apiError;
    }

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

    /* Dynamically pull fonts we require */
    if (window.WebFont && config.base_font) {
      window.WebFont.load({
        google: {
          families: [config.base_font, config.site_name_font],
        },
      });
    }

    this.requestUpdate();
  }

  router(route, params) {
    this.route = route;
    this.params = params;
  }

  async update(changed) {
    this.state.cart = await cache.all();
    super.update(changed);
  }

  async childUpdateRequest() {
    this.state.cart = await cache.all();
    this.requestUpdate();
  }

  render() {
    const { config, loading, apiError } = this.state;
    const { AVOCANO_PURCHASE_MODE } = getConfig();

    if (apiError) {
      return html`<app-error .apiError=${apiError}></app-error>`;
    }

    return loading
      ? html`<app-loading></app-loading>`
      : html`<app-header
            .headerTitle=${config.site_name}
            .cart=${this.state.cart}
          ></app-header>
          <app-main active-route=${this.route}>
            <div class="route" route="home">
              <app-home></app-home>
            </div>
            <div class="route" route="product">
              <app-product
                .productId=${parseInt(this.params.id, 10)}
                .updateParent=${this.childUpdateRequest}
              ></app-product>
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
            ${AVOCANO_PURCHASE_MODE === 'cart'
              ? html`<div class="route" route="checkout">
                  <app-checkout
                    .cart=${this.state.cart}
                    .updateParent=${this.childUpdateRequest}
                  ></app-checkout>
                </div>`
              : ''}
            <div class="route" route="not-found">
              <app-not-found></app-not-found>
            </div>
          </app-main>
          <app-footer></app-footer>`;
  }
}

customElements.define('avocano-shell', AvocanoShell);
