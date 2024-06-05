import { createStore, reconcile } from 'solid-js/store';
import { createUniqueId, untrack } from 'solid-js';
//import { createStorage } from '@solid-primitives/storage';
//import { liveQuery } from 'dexie';
//import db from './../db/db.js';


// Copied from @solid-primitives/storage as 
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

const pdfDefaultValues = {
  YourFullName: '',
  PartnerFullName: '',
  Email: '',
  Phone: '',
  BookingRef: '',
  CeremonyType: '',
  CeremonyVenue: '',
  CeremonyDate: '',
  CeremonyTime: '',
  WordingOption: '',
  Rings: '',
  RoomEntrance: '',
  Photographer: '',
  Videographer: '',
  GuestNumber: '',
  Witness1: '',
  Witness2: '',
  YourMum: '',
  YourMumDead: '',
  YourMumJob: '',
  YourMumRetired: '',
  YourDad: '',
  YourDadDead: '',
  YourDadJob: '',
  YourDadRetired: '',
  YourParent1: '',
  YourParent1Dead: '',
  YourParent1Job: '',
  YourParent1Retired: '',
  YourParent2: '',
  YourParent2Dead: '',
  YourParent2Job: '',
  YourParent2Retired: '',
  PartnerParent1: '',
  PartnerParent1Dead: '',
  PartnerParent1Job: '',
  PartnerParent1Retired: '',
  PartnerParent2: '',
  PartnerParent2Dead: '',
  PartnerParent2Job: '',
  PartnerParent2Retired: '',
  /*YourMum: '',
  YourMumJob: '',
  YourDad: '',
  YourDadJob: '',
  YourParent: '',
  YourParentJob: '',
  YourStepParent: '',
  YourStepParentJob: '',
  Your2ndStepParent: '',
  Your2ndStepParentJob: '',
  PartnerMum: '',
  PartnerMumJob: '',
  PartnerDad: '',
  PartnerDadJob: '',
  PartnerParent: '',
  PartnerParentJob: '',
  PartnerStepParent: '',
  PartnerStepParentJob: '',
  Partner2ndStepParent: '',
  Partner2ndStepParentJob: '',
  */
};

export const [pdfState, setPdfState] = makePersisted(createStore(pdfDefaultValues), {storage: localStorage});

// Sync with Dexie
/*
liveQuery(async () => db.ceremonyOptions.toArray()).subscribe(options => {
  options.forEach(({ key, value}) => {
    setPdfState(key, value);
  });
}); */