import { createStore, reconcile } from 'solid-js/store';
import { createUniqueId, untrack } from 'solid-js';
//import { createStorage } from '@solid-primitives/storage';
//import { liveQuery } from 'dexie';
//import db from './../db/db.js';
import { makePersisted } from '../factory/makePersisted.jsx';


const pdfDefaultValues = {
  'Your full name': '',
  'Partner full name': '',
  Email: '',
  Phone: '',
  'Ceremony type': '',
  'Ceremony venue': '',
  'Outdoor ceremony': '',
  'Outdoor terms': '',
  'Ceremony room': '',
  'Ceremony date': '',
  'Ceremony time': '',
  'Vows option': '',
  'Own vows': '',
  Readings: '',
  Rings: '',
  'Ring bearer': '',
  'Best person': '',
  'Room entrance': '',
  'Bridesmaids or attendants': '',
  Photographer: '',
  Videographer: '',
  'Number of guests': '',
  'Witness 1': '',
  'Witness 2': '',
  'Your parents': '',
  'Your step-parents': '',
  'Partner parents': '',
  'Partner step parents': '',
  'Before ceremony music': '',
  'Entrance music': '',
  'Signing music': '',
  'Exit music': '',
  'Extra info': '',
};

export const [pdfState, setPdfState] = makePersisted(createStore(pdfDefaultValues), {storage: localStorage});

// Sync with Dexie
/*
liveQuery(async () => db.ceremonyOptions.toArray()).subscribe(options => {
  options.forEach(({ key, value}) => {
    setPdfState(key, value);
  });
}); */