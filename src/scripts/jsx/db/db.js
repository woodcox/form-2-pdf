import Dexie from 'dexie';

export const db = new Dexie('ceremonyLandDB');
db.version(1).stores({
  ceremonyOptions: '++id, YourFullName, PartnerFullName, Email, Phone' // Primary key and indexed props
});