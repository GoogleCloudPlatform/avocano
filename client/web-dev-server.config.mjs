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

import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';

const replace = fromRollup(rollupReplace);
const hmr = process.argv.includes('--hmr');

export default {
  open: '/',
  watch: !hmr,
  port: 8081,
  open: true,
  rootDir: '.',
  basePath: '/',
  appIndex: 'index.html',
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    replace({
      include: ['src/utils/config.js'],
      preventAssignment: false,
      __api_url__: (process.env.API_URL || 'http://localhost:8000') + '/api',
      __purchase_mode__: process.env.AVOCANO_PURCHASE_MODE,
    }),
  ],
};
