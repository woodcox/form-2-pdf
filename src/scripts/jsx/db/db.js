import Dexie from 'dexie';

// Declare database
const db = new Dexie('ceremonyLandDB');
db.version(1).stores({
  ceremonyOptions: '++id, key, value', // Primary key '++id' and indexed props
});

export default db;


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