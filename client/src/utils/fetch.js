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

import { getConfig } from '../utils/config.js';
import { getDjangoError } from '../helpers/fetch.js';

const baseRequest = {
  credentials: 'include',
};

async function _getAPI(uri) {
  const { API_URL } = getConfig();

  let url = `${API_URL}/${uri}`;
  let apiError = { url: url };
  let response, data;

  try {
    response = await fetch(url, {
      method: 'GET',
      ...baseRequest,
    });
    data = await response.clone().json();
  } catch (error) {
    console.error(error);

    apiError.error = error.toString();

    // Based on common reasons for failure cases, make nicer messages

    // Network Errors
    if (error instanceof TypeError && error.message == 'Failed to fetch') {
      apiError.message = `The API didn't respond. Is the API server up?`;

      // Django Errors
    } else if (
      error instanceof SyntaxError &&
      error.message.includes('is not valid JSON')
    ) {
      apiError.message = `The server returned invalid JSON. Is Django returning an error?`;
      apiError.error = `Error: "${response.statusText}"`;
      apiError.extra_error = getDjangoError(await response.text());

      // Fallback Error
    } else {
      apiError.message = `Request encountered an error: ${error.name}`;
    }
    return { apiError };
  }

  // Capture not OK responses
  if (!response?.ok) {
    apiError.message = await response?.text();
    apiError.error = `Server returned ${response?.status} - ${response?.statusText}`;
    return { apiError };
  }

  return data;
}

async function _postAPI(uri, callback) {
  const { API_URL } = getConfig();

  let url = `${API_URL}/${uri}`;
  try {
    const csrfToken = _getAPI('csrf_token');

    await fetch(url, {
      method: 'POST',
      headers: { 'X-CSRFToken': csrfToken },
      ...baseRequest,
    });
    callback && callback(); // callbacks handle error message parsing directly.
  } catch (error) {
    console.error(error);
  }

  return { data };
}

export const getProduct = async productId => {
  return _getAPI(`products/${productId}`);
};

export const getActiveProduct = async () => {
  return _getAPI('active/product/');
};

export const buyProduct = async (productId, callback) => {
  _postAPI(`products/${productId}/purchase/`, callback);
};

export const getProductTestimonials = async productId => {
  if (productId) {
    return _getAPI(`testimonials/?product_id=${productId}`);
  } else {
    let errorMessage = 'productId required';
    console.log(errorMessage);
    return [{ message: errorMessage }];
  }
};

export const getProductList = async () => {
  return _getAPI(`products/`);
};

export const getSiteConfig = async () => {
  return _getAPI('active/site_config');
};

export const checkout = async payload => {
  if (payload?.items?.length) {
    return _postAPI('checkout/');
  } else {
    let errorMessage = 'Insufficient information to process checkout.';
    console.log(errorMessage);
    return [{ message: errorMessage }];
  }
};
