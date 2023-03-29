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
import Cookies from 'js-cookie';

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
        credentials: 'include',
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
      credentials: 'include',
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
        credentials: 'include',
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
          credentials: 'include',
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
      credentials: 'include',
    });
    products = await response.json();
  } catch (error) {
    console.error(error);
  }

  return products;
};

/**
 * checkout()
 *
 * POST /checkout
 */
export const checkout = async payload => {
  const { API_URL } = getConfig();
  let checkoutStatus;

  if (payload?.items?.length) {
    const response = await fetch(`${API_URL}/csrf_token`, {
      credentials: 'include',
    });

    const data = await response.json();
    const csrfToken = data.csrfToken;

    try {
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      checkoutStatus = await response.json();
    } catch (error) {
      console.error(error);
      checkoutStatus = { errors: [error] };
    }
  } else {
    console.error('Insufficient information to process checkout.');
    checkoutStatus = {
      errors: [{ message: 'Insufficient information to process checkout.' }],
    };
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
      credentials: 'include',
    });
    config = await response.json();
  } catch (error) {
    console.error(error);
  }

  return config;
};
