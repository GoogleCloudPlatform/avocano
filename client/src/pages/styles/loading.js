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
    height: 220px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 10px solid rgb(179, 181, 61);
    outline: 5px solid #865b53;
    outline-offset: 0px;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    background: radial-gradient(
      rgba(255, 246, 166, 0.3) 33%,
      rgb(179, 181, 61) 100%
    );
    animation: 3s linear 0s infinite normal none running spin;
  }

  .spinnerCore {
    margin-top: 25%;
    width: 5em;
    height: 5em;
    background-color: rgb(136, 91, 82);
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
