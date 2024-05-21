import db from './db';
import { createDexieArray } from './solid-dexie';


// Dexie functions
export const options = createDexieArray(() => db.ceremonyOptions.toArray());

export async function addOption(key, value) {
  await db.ceremonyOptions.add({ key, value });
}

export async function deleteOption(id) {
  await db.ceremonyOptions.delete(id);
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
*/
