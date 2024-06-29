import Dexie from 'dexie';
import { createResource, createSignal } from 'solid-js';
import { makePersisted } from './makePersisted.jsx';

// Declare database
const db = new Dexie('ceremonyDataDB');
db.version(1).stores({
  ceremonyOptions: '++id, key, value', // Primary key '++id' and indexed props
});

export default db;

async function fetchCeremonyOptions() {
  return await db.ceremonyOptions.toArray();
}

const [ceremonyOptionsResource, { mutate, refetch }] = createResource(fetchCeremonyOptions, {
  storage: makePersisted(createSignal([])),
});


const dexieStorage = {
  async getItem(key) {
    const item = await db.ceremonyDataDB.get(key);
    return item ? item.value : null;
  },
  async setItem(key, value) {
    await db.ceremonyDataDB.put({ key, value });
  },
  async removeItem(key) {
    await db.ceremonyDataDB.delete(key);
  },
  async clear() {
    await db.ceremonyDataDB.clear();
  },
};


/* Seed database
await db.ceremony.add({
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
});
*/