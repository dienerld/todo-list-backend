import { readFileSync, writeFileSync } from 'fs';
import { User } from '../models/user/user.model';

function getDatabase (): {users: User[]} {
  try {
    const fileDB = readFileSync('./database.json', 'utf-8');
    if (!fileDB) {
      return { users: [] };
    }
    return JSON.parse(fileDB);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function saveDatabase (data: {users: User[]}): void {
  try {
    writeFileSync('./database.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getDatabase, saveDatabase };
