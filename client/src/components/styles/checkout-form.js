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

import { css } from 'lit';

const styles = css`
  mwc-button {
    --mdc-theme-primary: darkgray;
  }

  .checkoutButton {
    margin-top: 10px;
    padding: 10px;
    color: gray;
    border-radius: 2px;
    border: none;
    cursor: pointer;
    font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
    text-transform: uppercase;
    font-size: 14px;
    background-color: var(--color-action);
    color: var(--color-action-text);
  }

  .checkoutButton:disabled {
    background-color: lightgray;
    color: darkgray;
    border-color: lightgray;
  }
`;

export default styles;
