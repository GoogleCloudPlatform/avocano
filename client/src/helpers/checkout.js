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

export const getCartTotal = cart =>
  Number.parseFloat(
    cart?.reduce((acc, item) => (acc += item.count * item.discount_price), 0) ||
      0
  ).toFixed(2);

export const getCartItemTotal = cart =>
  cart?.reduce((acc, item) => (acc += item.count), 0) || 0;

export const getCartPayload = cart => {
  let result = cart?.reduce((acc, item) => {
    acc?.push({
      id: item.id,
      countRequested: item.count,
    });
    return acc;
  }, []);

  return result || [];
};

export default { getCartTotal, getCartPayload, getCartItemTotal };
