import db from './db';
import { liveQuery } from 'dexie';
import { createDexieArray } from './solid-dexie';

export async function addOption(key, value) {
  await db.ceremonyOptions.add({ key, value });
}

export function getCeremonyOptions() {
  return liveQuery(() => db.ceremonyOptions.toArray());
}



/* Dexie functions
export async function addOption(key, value) {
  await db.ceremonyOptions.add({ key, value });
}

export async function getAllOptions() {
  return await db.ceremonyOptions.toArray();
}

export async function updateOption(id, newValue) {
  await db.ceremonyOptions.update(id, { value: newValue });
}

export async function deleteOption(id) {
  await db.ceremonyOptions.delete(id);
}
*/
