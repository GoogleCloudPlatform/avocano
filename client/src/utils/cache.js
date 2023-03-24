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

import { openDB } from 'idb';

const dbName = 'avocano-demo';
const storeName = 'avocart';
const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(storeName);
  },
});

async function get(key) {
  return (await dbPromise).get(storeName, key);
}

async function set(key, val) {
  return (await dbPromise).put(storeName, val, key);
}

async function del(key) {
  return (await dbPromise).delete(storeName, key);
}

async function clear() {
  return (await dbPromise).clear(storeName);
}

async function all() {
  return (await dbPromise).getAll(storeName);
}

async function deleteDB() {
  return await deleteDB(dbName);
}

export default { get, set, del, clear, all, deleteDB };
