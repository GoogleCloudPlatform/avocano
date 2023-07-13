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

import { parseParams, parseQuery, testRoute } from './utility/router-utility';

export function router(base) {
  return class extends base {
    static get properties() {
      return {
        route: { type: String, reflect: true, attribute: 'route' },
        canceled: { type: Boolean },
      };
    }

    constructor(...args) {
      super(...args);

      this.route = '';
      this.canceled = false;
    }

    connectedCallback(...args) {
      super.connectedCallback(...args);

      // @ts-ignore
      this.routing(this.constructor.routes, (...args) => this.router(...args));
      window.addEventListener('route', () => {
        // @ts-ignore
        this.routing(this.constructor.routes, (...args) =>
          this.router(...args),
        );
      });

      window.onpopstate = () => {
        window.dispatchEvent(new CustomEvent('route'));
      };
    }

    routed(name, params, query, data, callback, localCallback) {
      localCallback && localCallback(name, params, query, data);
      callback(name, params, query, data);
    }

    routing(routes, callback) {
      this.canceled = true;

      const uri = decodeURI(window.location.pathname);
      const querystring = decodeURI(window.location.search);

      let notFoundRoute = routes.filter(route => route.pattern === '*')[0];
      let activeRoute = routes.filter(
        route => route.pattern !== '*' && testRoute(uri, route.pattern),
      )[0];
      let query = parseQuery(querystring);

      if (activeRoute) {
        activeRoute.params = parseParams(activeRoute.pattern, uri);
        activeRoute.data = activeRoute.data || {};
        if (
          activeRoute.authentication &&
          activeRoute.authentication.authenticate &&
          typeof activeRoute.authentication.authenticate === 'function'
        ) {
          this.canceled = false;
          Promise.resolve(
            activeRoute.authentication.authenticate.bind(this).call(),
          ).then(authenticated => {
            if (!this.canceled) {
              if (authenticated) {
                if (
                  activeRoute.authorization &&
                  activeRoute.authorization.authorize &&
                  typeof activeRoute.authorization.authorize === 'function'
                ) {
                  this.canceled = false;
                  Promise.resolve(
                    activeRoute.authorization.authorize.bind(this).call(),
                  ).then(authorizatied => {
                    if (!this.canceled) {
                      if (authorizatied) {
                        this.routed(
                          activeRoute.name,
                          activeRoute.params,
                          query,
                          activeRoute.data,
                          callback,
                          activeRoute.callback,
                        );
                      } else {
                        this.routed(
                          activeRoute.authorization.unauthorized.name,
                          activeRoute.params,
                          query,
                          activeRoute.data,
                          callback,
                          activeRoute.callback,
                        );
                      }
                    }
                  });
                } else {
                  this.routed(
                    activeRoute.name,
                    activeRoute.params,
                    query,
                    activeRoute.data,
                    callback,
                    activeRoute.callback,
                  );
                }
              } else {
                this.routed(
                  activeRoute.authentication.unauthenticated.name,
                  activeRoute.params,
                  query,
                  activeRoute.data,
                  callback,
                  activeRoute.callback,
                );
              }
            }
          });
        } else if (
          activeRoute.authorization &&
          activeRoute.authorization.authorize &&
          typeof activeRoute.authorization.authorize === 'function'
        ) {
          this.canceled = false;
          Promise.resolve(
            activeRoute.authorization.authorize.bind(this).call(),
          ).then(authorizatied => {
            if (!this.canceled) {
              if (authorizatied) {
                this.routed(
                  activeRoute.name,
                  activeRoute.params,
                  query,
                  activeRoute.data,
                  callback,
                  activeRoute.callback,
                );
              } else {
                this.routed(
                  activeRoute.authorization.unauthorized.name,
                  activeRoute.params,
                  query,
                  activeRoute.data,
                  callback,
                  activeRoute.callback,
                );
              }
            }
          });
        } else {
          this.routed(
            activeRoute.name,
            activeRoute.params,
            query,
            activeRoute.data,
            callback,
            activeRoute.callback,
          );
        }
      } else if (notFoundRoute) {
        notFoundRoute.data = notFoundRoute.data || {};
        this.routed(
          notFoundRoute.name,
          {},
          query,
          notFoundRoute.data,
          callback,
          notFoundRoute.callback,
        );
      }
    }
  };
}

export function navigator(base) {
  return class extends base {
    navigate(href) {
      window.history.pushState({}, null, href);
      window.dispatchEvent(new CustomEvent('route'));
    }
  };
}

export function outlet(base) {
  return class extends base {
    static get properties() {
      return {
        activeRoute: { type: String, reflect: true, attribute: 'active-route' },
      };
    }

    attributeChangedCallback(...args) {
      super.attributeChangedCallback(...args);

      // VENDORED FIX: https://github.com/hamedasemi/lit-element-router/pull/47
      setTimeout(() => {
        args.some(arg => arg === 'active-route') && this.outlet();
      });
    }

    connectedCallback(...args) {
      super.connectedCallback(...args);

      setTimeout(() => {
        this.outlet();
      });
    }

    outlet() {
      Array.from(this.querySelectorAll(`[route]`)).map(active => {
        active.style.display = 'none';
      });
      Array.from(this.shadowRoot.querySelectorAll(`[route]`)).map(active => {
        active.style.display = 'none';
      });
      if (this.activeRoute) {
        Array.from(this.querySelectorAll(`[route~=${this.activeRoute}]`)).map(
          active => {
            active.style.display = '';
          },
        );
        Array.from(
          this.shadowRoot.querySelectorAll(`[route~=${this.activeRoute}]`),
        ).map(active => {
          active.style.display = '';
        });
      }
    }
  };
}
