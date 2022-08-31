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
  :host {
    font-family: var(--base-font), sans-serif;
    width: 100%;
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 2em;
    background-color: var(--color-primary);
    background-image: linear-gradient(to right, white, var(--color-primary));
  }

  .route {
  }

  h1 {
    font-family: var(--site-name-font), cursive;
    font-size: 45px;
  }
  h1 > a {
    color: var(--site-name-color) !important;
  }

  .header > h1 > a {
    text-decoration: none;
  }

  .header > h1 > a:active {
    text-decoration: underline;
  }

  .navigationBar {
    display: flex;
    align-items: flex-end;
    width: inherit;
    margin-bottom: 20px;
  }
`;

export default styles;
