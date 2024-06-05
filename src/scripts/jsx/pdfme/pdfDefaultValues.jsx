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