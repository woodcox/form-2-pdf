// See - https://www.npmjs.com/package/solid-dexie & https://github.com/faassen/solid-dexie/blob/main/src/solid-dexie.ts

import { createMemo, from, createEffect, createResource, on, onCleanup } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
import { liveQuery } from 'dexie';

function createDexieSignal(querier) {
  const get = createMemo(() => from(liveQuery(querier)));
  return () => get()();
}

function createDexieArray(querier) {
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

function createDexieStore(querier) {
    const [store, setStore] = createStore({
        __loading: true,
    });
    const observable = liveQuery(querier);
    const signal = from(observable);
    createEffect(() => {
        const data = signal();
        if (data) {
            setStore(reconcile(Object.assign(Object.assign({}, data), { __loading: false }), { merge: true }));
        }
    });
    return store;
}

function createDexieResource(querier) {
    const store = createDexieStore(querier);
    let loaded = false;
    return createResource(store, (theStore) => {
        if (theStore.__loading) {
            return new Promise((resolve) => {
                createEffect(() => {
                    if (!store.__loading && !loaded) {
                        loaded = true;
                        resolve(store);
                    }
                });
            });
        }
        return Promise.resolve(store);
    });
}

export { createDexieArray, createDexieSignal, createDexieStore, createDexieResource };
