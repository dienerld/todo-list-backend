import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { User } from '../models/user/user.model';

// eslint-disable-next-line n/no-path-concat
const pathDB = path.resolve(`${__dirname}/database.json`);
function getDatabase (): {users: User[]} {
  try {
    console.log(pathDB);
    const fileDB = readFileSync(pathDB, 'utf-8');

    return JSON.parse(fileDB);
  } catch (error) {
    console.error(error);
    return { users: [] };
  }
}

function saveDatabase (data: {users: User[]}): void {
  try {
    writeFileSync(pathDB, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getDatabase, saveDatabase };
