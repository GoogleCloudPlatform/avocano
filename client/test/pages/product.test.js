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

import { html } from 'lit';
import { waitUntil, fixture, expect } from '@open-wc/testing';

import '../../src/pages/product.js';

describe('Product', () => {
  it('renders loading element', async () => {
    const element = await fixture(html`<app-product></app-product>`);
    const contentElem = element.shadowRoot.querySelector('.productBase > p');
    const productItemElem =
      element.shadowRoot.querySelector('app-product-item');

    expect(productItemElem).to.not.exist;
    expect(contentElem).to.exist;
    expect(contentElem.textContent).to.equal('loading...');
  });

  it('renders product item element properly', async () => {
    const mockState = { status: 'loaded', productItem: { name: 'hello' } };
    const loadedElem = await fixture(
      html`<app-product .state=${mockState}></app-product>`,
    );

    await waitUntil(() => loadedElem.state, 'Element did not become ready');

    const base = loadedElem.shadowRoot.querySelector('app-product-item');
    expect(base).to.exist;
  });
});
