// See - https://www.npmjs.com/package/solid-dexie & https://github.com/faassen/solid-dexie/blob/main/src/solid-dexie.ts

import { createMemo, from, createEffect, on, onCleanup } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
import { liveQuery } from 'dexie';

function createDexieSignalQuery(querier) {
  const get = createMemo(() => from(liveQuery(querier)));
  return () => get()();
}
function createDexieArrayQuery(querier) {
  const [store, setStore] = createStore([]);
  createEffect(on(querier, () => {
    fromReconcileStore(liveQuery(querier), store, setStore);
  }));
  return store;
}
function fromReconcileStore(producer, store, setStore, options = { key: "id" }) {
  const unsub = producer.subscribe((v) => setStore(reconcile(v, options)));
  onCleanup(() => "unsubscribe" in unsub ? unsub.unsubscribe() : unsub());
  return store;
}

export { createDexieArrayQuery, createDexieSignalQuery };