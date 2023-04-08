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

  .spinnerBorder {
    width: 170px;
    height: 170px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20%;
    background: linear-gradient(
      0deg,
      rgba(178, 180, 63, 0.1) 33%,
      rgb(178, 180, 63) 100%
    );
    animation: 0.8s linear 0s infinite normal none running spin;
  }

  .spinnerCore {
    width: 70%;
    height: 70%;
    background-color: white;
    border-radius: 20%;
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
