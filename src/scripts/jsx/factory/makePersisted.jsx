import { reconcile } from 'solid-js/store';
import { createUniqueId, untrack } from 'solid-js';

// Copied from @solid-primitives/storage as tauri import casuing issues
function makePersisted(signal, options = {}) {
  const storage = options.storage || globalThis.localStorage;
  if (!storage) {
    return signal;
  }
  const storageOptions = options.storageOptions;
  const name = options.name || `storage-${createUniqueId()}`;
  const serialize = options.serialize || JSON.stringify.bind(JSON);
  const deserialize = options.deserialize || JSON.parse.bind(JSON);
  const init = storage.getItem(name, storageOptions);
  const set = typeof signal[0] === "function" ? (data) => {
    try {
      const value = deserialize(data);
      signal[1](() => value);
    } catch (e) {
      if (isDev)
        console.warn(e);
    }
  } : (data) => {
    try {
      const value = deserialize(data);
      signal[1](reconcile(value));
    } catch (e) {
      if (isDev)
        console.warn(e);
    }
  };
  let unchanged = true;
  if (init instanceof Promise)
    init.then((data) => unchanged && data && set(data));
  else if (init)
    set(init);
  if (typeof options.sync?.[0] === "function") {
    const get = typeof signal[0] === "function" ? signal[0] : () => signal[0];
    options.sync[0]((data) => {
      if (data.key !== name || !isServer && (data.url || globalThis.location.href) !== globalThis.location.href || data.newValue === serialize(untrack(get))) {
        return;
      }
      set(data.newValue);
    });
  }
  return [
    signal[0],
    typeof signal[0] === "function" ? (value) => {
      const output = signal[1](value);
      const serialized = value != null ? serialize(output) : value;
      options.sync?.[1](name, serialized);
      if (value != null)
        storage.setItem(name, serialized, storageOptions);
      else
        storage.removeItem(name, storageOptions);
      unchanged = false;
      return output;
    } : (...args) => {
      signal[1](...args);
      const value = serialize(untrack(() => signal[0]));
      options.sync?.[1](name, value);
      storage.setItem(name, value, storageOptions);
      unchanged = false;
    }
  ];
}

var addClearMethod = (storage) => {
  if (typeof storage.clear === "function") {
    return storage;
  }
  storage.clear = () => {
    let key;
    while (key = storage.key(0)) {
      storage.removeItem(key);
    }
  };
  return storage;
};

export { addClearMethod, makePersisted };