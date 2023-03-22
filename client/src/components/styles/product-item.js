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

import { css } from 'lit';

const styles = css`
  .buyButton {
    margin-top: 10px;
    padding: 10px;
    background-color: var(--color-action);
    color: var(--color-action-text);
    border-radius: 2px;
    text-transform: uppercase;
    text-decoration: none;
  }

  .itemTitle {
    color: var(--color-secondary);
  }

  .productItem {
    display: flex;
    align-item: flex-start;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
    background: white;
    cursor: pointer;
  }

  .productItemContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px;
  }

  .productItemWrapper {
    display: flex;
    flex-direction: row;
  }

  @media screen and (max-width: 600px) {
    .productItemWrapper {
      flex-direction: column;
    }
  }

  .productItemContent {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 30px;
  }

  .testimonialsWrapper {
    margin-top: 20px;
    width: 100%;
  }

  .testimonialsHeader {
    padding: 10px;
    text-align: left;
  }

  .testimonialsContent {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #ededed;
  }

  .testimonialsItem {
    width: 100%;
    border-bottom: 1px solid lightgrey;
  }

  .testimonialItemContent {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
  }

  .testimonialsContent {
    text-align: left;
  }

  .rating {
    padding: 10px 0 10px 0;
    color: orange;
  }

  .reviewerDetails {
    font-size: 90%;
  }

  .reviewSummary {
    font-weight: bold;
    margin: 10px 0 10px 0;
  }

  .reviewDescription {
    font-size: 90%;
  }

  .price {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .retailPrice {
    text-decoration: line-through;
    margin-bottom: 10px;
    color: grey;
  }

  .discountPrice {
    font-weight: bold;
    font-size: 120%;
  }

  .discountRate {
    color: green;
  }

  .dialogWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .productimageWrapper {
    display: flex;
    align-items: baseline;
    justify-content: center;
    border-radius: 10px;
    background: #fff;
    width: 300px;
    height: 300px;
    overflow: hidden;
    margin: 30px;
  }

  img.productimage {
    height: auto;
    width: 100%;
  }

  img.oopsAvocado {
    width: auto;
    height: 200px;
    padding: 10px;
  }
`;

export default styles;
