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
  YourStepParent1: '',
  YourStepParent1Dead: '',
  YourStepParent1Job: '',
  YourStepParent1Retired: '',
  YourStepParent2: '',
  YourStepParent2Dead: '',
  YourStepParent2Job: '',
  YourStepParent2Retired: '',
  PartnerMum: '',
  PartnerMumDead: '',
  PartnerMumJob: '',
  PartnerMumRetired: '',
  PartnerDad: '',
  PartnerDadDead: '',
  PartnerDadJob: '',
  PartnerDadRetired: '',
  PartnerStepParent1: '',
  PartnerStepParent1Dead: '',
  PartnerStepParent1Job: '',
  PartnerStepParent1Retired: '',
  PartnerStepParent2: '',
  PartnerStepParent2Dead: '',
  PartnerStepParent2Job: '',
  PartnerStepParent2Retired: '',
};

export const [pdfState, setPdfState] = makePersisted(createStore(pdfDefaultValues), {storage: localStorage});

// Sync with Dexie
/*
liveQuery(async () => db.ceremonyOptions.toArray()).subscribe(options => {
  options.forEach(({ key, value}) => {
    setPdfState(key, value);
  });
}); */