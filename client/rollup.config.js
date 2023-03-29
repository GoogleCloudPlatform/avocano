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

import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import html from '@web/rollup-plugin-html';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: '404.html',
    output: { dir: 'dist' },
    plugins: [html()],
  },
  {
    input: 'index.html',
    output: {
      entryFileNames: '[hash].js',
      chunkFileNames: '[hash].js',
      assetFileNames: '[hash][extname]',
      format: 'es',
      dir: 'dist',
    },
    preserveEntrySignatures: false,

    plugins: [
      /** Replace API URL with written API, linked to Firebase */
      replace({
        include: ['src/utils/config.js'],
        preventAssignment: false,
        __api_url__: '/api', // set in firebase.json
        __purchase_mode__: process.env.AVOCANO_PURCHASE_MODE,
      }),
      /** Enable using HTML as rollup entrypoint */
      html({
        minify: true,
      }),
      /** Resolve bare module imports */
      nodeResolve(),
      /** Minify JS */
      terser(),
      /** Bundle assets references via import.meta.url */
      importMetaAssets(),
      /** Compile JS to a lower language target */
      babel({
        babelHelpers: 'bundled',
        presets: [
          [
            require.resolve('@babel/preset-env'),
            {
              targets: [
                'last 3 Chrome major versions',
                'last 3 Firefox major versions',
                'last 3 Edge major versions',
                'last 3 Safari major versions',
              ],
              modules: false,
              bugfixes: true,
            },
          ],
        ],
        plugins: [
          [
            require.resolve('babel-plugin-template-html-minifier'),
            {
              modules: {
                lit: ['html', { name: 'css', encapsulation: 'style' }],
              },
              failOnError: false,
              strictCSS: true,
              htmlMinifier: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                removeComments: true,
                caseSensitive: true,
                minifyCSS: true,
              },
            },
          ],
        ],
      }),
    ],
  },
];
