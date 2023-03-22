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
`;

export default styles;
