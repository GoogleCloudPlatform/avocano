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

const baseRequest = {
  credentials: 'include',
};

/**
 * getProduct()
 *
 * Retrieves product at specified id defined from django api
 * GET /product/{productId}
 */
export const getProduct = async productId => {
  const { API_URL } = getConfig();
  let product, response, apiError, url;

  if (productId) {
    try {
      url = `${API_URL}/products/${productId}`
      response = await fetch(url, {
        method: 'GET',
        ...baseRequest,
      });
      product = await response.json();
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('Error: id required');
  }

  apiError = parse404(apiError, url, response, "Product not found. Does the product exist in the API?")

  if (apiError) {
    console.error(apiError);
    product = { apiError }
  }

  return product;
};

/**
 * getActiveProduct()
 *
 * Retrieves active product as defined from django api
 * GET /active/product/
 */
export const getActiveProduct = async () => {
  const { API_URL } = getConfig();
  let activeProduct, apiError, url, response;

  try {
    url = `${API_URL}/active/product/`
    response = await fetch(url, {
      method: 'GET',
      ...baseRequest,
    });
    activeProduct = await response.json();
  } catch (error) {
    console.error(error);
  }

  apiError = parse404(apiError, url, response, "No active products found. Have you created any?") 

  if (apiError) {
    console.error(apiError);
    activeProduct = { apiError }
  }

  return activeProduct;
};

/**
 * buyProduct()
 *
 * Achieves "product" purchase as defined from django api
 * POST /products/{productId}/purchase/
 */
export const buyProduct = async (productId, callback) => {
  const { API_URL } = getConfig();

  if (productId) {
    try {

      // Retrieve csrf token from server
      const csrfToken = await getCSRFToken();

      await fetch(`${API_URL}/products/${productId}/purchase/`, {
        method: 'POST',
        headers: { 'X-CSRFToken': csrfToken },
        ...baseRequest,
      });
      callback && callback();
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('Error: id required');
  }
};

/**
 * getProductTestimonials()
 *
 * Retrieves testimonials for product as defined from django api
 * GET /testimonials/{productId}
 */
export const getProductTestimonials = async productId => {
  const { API_URL } = getConfig();
  let testimonials = [];

  if (productId) {
    try {
      const response = await fetch(
        `${API_URL}/testimonials/?product_id=${productId}`,
        {
          method: 'GET',
          ...baseRequest,
        }
      );
      testimonials = response.json();
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('Error: id required');
  }

  return testimonials;
};

/**
 * getProductList()
 *
 * Retrieves product list as defined from django api
 * GET /products
 */
export const getProductList = async () => {
  const { API_URL } = getConfig();
  let products;

  try {
    const response = await fetch(`${API_URL}/products/`, {
      method: 'GET',
      ...baseRequest,
    });
    products = await response.json();
  } catch (error) {
    console.error(error);
  }

  return products;
};

/**
 * getCSRFToken()
 *
 * GET /csrf_token
 */
const getCSRFToken = async () => {
  const { API_URL } = getConfig();
  let token;

  try {
    const response = await fetch(`${API_URL}/csrf_token`, baseRequest);
    token = (await response.json())?.csrfToken;
  } catch (error) {
    throw new Error(error);
  }

  return token;
};

/**
 * checkout()
 *
 * POST /checkout
 */
export const checkout = async payload => {
  const { API_URL } = getConfig();
  let checkoutStatus;
  let errors;

  if (payload?.items?.length) {
    try {
      // Retrieve csrf token from server
      const csrfToken = await getCSRFToken();

      // Submit form payload and pass back csrf token
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: { 'X-CSRFToken': csrfToken },
        body: JSON.stringify(payload),
        ...baseRequest,
      });
      checkoutStatus = await response.json();
    } catch (error) {
      errors = [error];
    }
  } else {
    errors = [{ message: 'Insufficient information to process checkout.' }];
  }

  if (errors) {
    console.error(errors);
    checkoutStatus = { errors };
  }

  return checkoutStatus;
};

/**
 * getSiteConfig()
 *
 * Retrieves site_config as defined from django api
 * GET /active/site_config
 */
export const getSiteConfig = async () => {
  const { API_URL } = getConfig();
  let url, config, apiError, response;

  try {
    url = `${API_URL}/active/site_config/`
    response = await fetch(url, {
      method: 'GET',
      ...baseRequest,
    });
    config = await response.json();
  } catch (error) {
    apiError = parseError(url, response, error)
  }

  apiError = parse404(apiError, url, response, "No active site config found. Has the database been configured?")

  if (apiError) {
    console.error(apiError);
    config = { apiError }
  }

  return config;
};

// Process common errors with human information
function parseError(url, response, error) {
  let apiError = { error: error.toString(), url: url }

  if (error instanceof SyntaxError) {
    apiError.message = `Server returned ${response?.status} - ${response?.statusText}`
  }
  else if (error instanceof TypeError) {
    apiError.message = `The API didn't respond. Is the API server up?`
  } else {
    apiError.message = `Returned ${error.name}`
  }
  return apiError
}

// Process a 404 error with human information
function parse404(apiError, url, response, message) {
  if (apiError) {  // if we've already got an error, don't override in this case
    return apiError
  }

  if (response?.status == 404) {
    apiError = {
      message: message,
      error: response.statusText, url: url
    }
  }
  return apiError
}