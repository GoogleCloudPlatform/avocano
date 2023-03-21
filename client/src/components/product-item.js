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
import styles from './styles/product-item.js';
import { buyProduct, getProductTestimonials } from '../utils/fetch.js';
import cache from '../utils/cache.js';

const noimage = new URL('../../assets/noimage.png', import.meta.url).href;
const oopsAvocado = new URL('../../assets/oops-avocado.png', import.meta.url)
  .href;

export class ProductItem extends LitElement {
  static get properties() {
    return {
      productId: { type: Number },
      productItem: { type: Object },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.state = {
      count: 0,
      openDialog: false,
      openSoldOutDialog: false,
      testimonials: [],
      productItem: {},
    };
  }

  /**
   * Executes when component has initially loaded
   * To read more about lifecycle methods:
   * https://lit.dev/docs/v1/components/lifecycle/#updated
   */
  async updated() {
    let testimonials = [];
    const { id, inventory_count } = this.productItem || {};

    // Ensure we are retrieving current product testimonials
    if (this.state.productItem?.id !== id) {
      if (id) {
        testimonials = await getProductTestimonials(id);
      }

      this.state = {
        count: inventory_count,
        testimonials,
      };

      this.state.productItem = this.productItem;
      this.requestUpdate();
    }
  }

  /**
   * Toggle the fake product dialog
   */
  toggleDialog() {
    this.state.openDialog = !this.state.openDialog;
    this.requestUpdate();
  }

  /**
   * Toggle the sold out product dialog
   */
  toggleSoldOutDialog() {
    this.state.openSoldOutDialog = !this.state.openSoldOutDialog;
    this.requestUpdate();
  }

  /**
   * 'Purchase' the product, but display to
   * user that this is in fact a fake product
   */
  async buyProduct(event) {
    if (event) {
      event.preventDefault();
    }

    if (this.state.count > 0) {
      await buyProduct(this.productItem?.id, () => {
        this.state.count--;
        // Open fake product dialog
        this.toggleDialog();
      });
    } else {
      // Open sold out dialog
      this.toggleSoldOutDialog();
    }
  }

  /**
   * Add fake product to cart
   */
  async addProductToCart(event) {
    if (event) {
      event.preventDefault();
    }
    const { productItem } = this.state;
    const result = await cache.get(productItem.name);

    if (result?.count) {
      cache.set(productItem.name, {
        name: productItem.name,
        id: productItem.id,
        count: result.count + 1,
      });
    } else {
      cache.set(productItem.name, {
        name: productItem.name,
        id: productItem.id,
        count: 1,
      });
    }
  }

  render() {
    const { count, testimonials, openDialog, openSoldOutDialog } = this.state;
    const {
      name,
      price,
      discount_price,
      discount_percent,
      image,
      description,
    } = this.productItem || {};

    return html`
      <div class="productItemContainer">
        <div class="productItemWrapper">
          <div class="productimageWrapper">
            <img
              class="productimage"
              alt="product logo"
              src=${image}
              loading="lazy"
              onerror=${`this.src='${noimage}';`}
            />
          </div>
          <div class="productItemContent">
            <h2 class="itemTitle">${name}</h2>
            ${discount_percent > 0
              ? html`<div class="price">
                  <div class="retailPrice">RRP $${price}</div>
                  <div class="discountPrice">Now $${discount_price}</div>
                  <div class="discountRate">Save ${discount_percent}%</div>
                </div>`
              : html`<div class="price">
                  <div class="discountPrice">$${discount_price}</div>
                </div>`}
            <div class="inventory">${`Only ${count} left!`}</div>
            <a
              href="#"
              class="buyButton"
              label="Buy"
              @click="${this.buyProduct}"
              >Buy</a
            >
          </div>
        </div>
        <div class="productDescription">${description}</div>
        <div class="testimonialsWrapper">
          <div class="testimonialsHeader">
            <h3>Testimonials</h3>
          </div>
          <div class="testimonialsContent">
            ${testimonials?.length
              ? testimonials.map(
                  (item, index) =>
                    html`
                      <div class="testimonialsItem">
                        <div class="testimonialItemContent">
                          <div class="rating">
                            ${`★`.repeat(item.rating)}${`☆`.repeat(
                              5 - item.rating
                            )}
                          </div>
                          <div class="reviewerDetails">
                            ${item.reviewer_name} from ${item.reviewer_location}
                          </div>
                          <div class="reviewSummary">${item.summary}</div>
                          <div class="reviewDescription">
                            ${item.description}
                          </div>
                        </div>
                      </div>
                    `
                )
              : html`<p>No testimonials ... yet</p>`}
          </div>
        </div>
        ${openDialog
          ? html`
              <mwc-dialog open>
                <div class="dialogWrapper">
                  <img class="oopsAvocado" src=${oopsAvocado} />
                  <div>
                    <h2>Oops!</h2>
                    <div>Sorry! This is not a real product.</div>
                    <div>
                      <br />
                      There isn't such thing as a ${name}, at least in this
                      storefront. But thank you for your interest in this
                      product!
                    </div>
                  </div>
                </div>
                <mwc-button
                  label="Oh no! 😭"
                  slot="primaryAction"
                  @click="${this.toggleDialog}"
                ></mwc-button>
              </mwc-dialog>
            `
          : ''}
        ${openSoldOutDialog
          ? html`
              <mwc-dialog open>
                <div class="dialogWrapper">
                  <div>
                    <h2>Sold out!</h2>
                    <div>This is product is no longer available.</div>
                    <div>
                      Lucas ipsum dolor sit amet solo sidious hutt jade wampa
                      darth leia yavin vader tatooine. Jawa yoda amidala wedge
                      chewbacca. Qui-gon jinn qui-gon hutt yavin mon solo anakin
                      hutt. Darth darth organa luke. Leia c-3po calamari lando
                      boba palpatine mandalore boba.
                    </div>
                  </div>
                </div>
                <mwc-button
                  label="Close"
                  slot="primaryAction"
                  @click="${this.toggleSoldOutDialog}"
                ></mwc-button>
              </mwc-dialog>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('app-product-item', ProductItem);
