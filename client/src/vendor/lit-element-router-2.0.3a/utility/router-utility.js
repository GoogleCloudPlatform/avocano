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
//
//
// Copyright 2019 lit-element-router developers
//
// Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee
// is hereby granted, provided that the above copyright notice and this permission notice appear in all
// copies.
//
// THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING
// FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
// OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.

export function stripExtraTrailingSlash(str) {
  while (str.length !== 1 && str.substr(-1) === '/') {
    str = str.substr(0, str.length - 1);
  }
  return str;
}

export function parseQuery(querystring) {
  //VENDORED FIX: use URLSearchParams instead of re-implementing RFC3986 parsing
  return Object.fromEntries(new URLSearchParams(querystring));
}

export function parseParams(pattern, uri) {
  let params = {};

  const patternArray = pattern.split('/').filter(path => {
    return path != '';
  });
  const uriArray = uri.split('/').filter(path => {
    return path != '';
  });

  patternArray.map((pattern, i) => {
    if (/^:/.test(pattern)) {
      params[pattern.substring(1)] = uriArray[i];
    }
  });
  return params;
}

export function patternToRegExp(pattern) {
  if (pattern) {
    return new RegExp(
      '^(|/)' +
        pattern.replace(
          /:[^\s/]+/g,
          '([\\w\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff-]+)',
        ) +
        '(|/)$',
    );
  } else {
    return new RegExp('(^$|^/$)');
  }
}

export function testRoute(uri, pattern) {
  if (patternToRegExp(pattern).test(uri)) {
    return true;
  }
}
