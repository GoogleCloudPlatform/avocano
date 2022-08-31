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
  h1.productTitle {
    color: var(--color-secondary);
  }

  .productBase {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  img.productimage {
    height: auto;
    width: 100%;
  }

  .productimageWrapper {
    display: flex;
    align-items: baseline;
    justify-content: center;
    border-radius: 10px;
    width: 150px;
    height: 150px;
    overflow: hidden;
    margin-right: 20px;
  }

  .productContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: 20px;
  }

  .productWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    max-width: 500px;
    margin: auto;
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

  .productItemContent {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
  }

  .itemTitle {
    font-weight: 600;
    margin-bottom: 15px;
  }
`;

export default styles;
