import { createStore, reconcile } from 'solid-js/store';
import { createUniqueId, untrack } from 'solid-js';
//import { createStorage } from '@solid-primitives/storage';
//import { liveQuery } from 'dexie';
//import db from './../db/db.js';
import { makePersisted } from '../factory/makePersisted.jsx';


const pdfDefaultValues = {
  YourFullName: '',
  PartnerFullName: '',
  Email: '',
  Phone: '',
  CeremonyType: '',
  CeremonyVenue: '',
  CeremonyRoom: '',
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
  YourParents: '',
  YourStepParents: '',
  PartnerParents: '',
  PartnerStepParents: '',
  BeforeCeremonyMusic: '',
  EntranceMusic: '',
  SigningMusic: '',
  ExitMusic: '',
};

export const [pdfState, setPdfState] = makePersisted(createStore(pdfDefaultValues), {storage: localStorage});

// Sync with Dexie
/*
liveQuery(async () => db.ceremonyOptions.toArray()).subscribe(options => {
  options.forEach(({ key, value}) => {
    setPdfState(key, value);
  });
}); */