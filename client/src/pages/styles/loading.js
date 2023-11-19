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
  .loadingContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 500px;
  }

  .loadingTitle {
    padding: 10px;
  }

  .avocado {
    width: 120px;
    height: 150px;
    position: relative;
    animation: spin 2s linear infinite;
    background: radial-gradient(
      ellipse at center,
      #568203 0%,
      #568203 40%,
      #4D6D31 41%,
      #568203 50%,
      #4D6D31 51%,
      #568203 100%
    );
    border-radius: 50% 50% 40% 40%;
  }

  .pit {
    position: absolute;
    top: 40%;
    left: 45%;
    width: 15px;
    height: 20px;
    background-color: #402e18;
    border-radius: 50%;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default styles;
