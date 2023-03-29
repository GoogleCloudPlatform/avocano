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
  let product;

  if (productId) {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
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
  let activeProduct;

  try {
    const response = await fetch(`${API_URL}/active/product/`, {
      method: 'GET',
      ...baseRequest,
    });
    activeProduct = await response.json();
  } catch (error) {
    console.error(error);
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
      await fetch(`${API_URL}/products/${productId}/purchase/`, {
        method: 'POST',
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
  let config;

  try {
    const response = await fetch(`${API_URL}/active/site_config/`, {
      method: 'GET',
      ...baseRequest,
    });
    config = await response.json();
  } catch (error) {
    console.error(error);
  }

  return config;
};
