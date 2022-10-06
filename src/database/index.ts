import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { User } from '../domain/models/user/user.model';

// eslint-disable-next-line n/no-path-concat
const pathDB = path.resolve(`${__dirname}/database.json`);
function getDatabase (): User[] {
  try {
    console.log(pathDB);
    const fileDB = readFileSync(pathDB, 'utf-8');

    const usersFile = JSON.parse(fileDB);
    const users = usersFile.map((user: User) => User.create(user));

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function saveDatabase (data: User[]): void {
  try {
    writeFileSync(pathDB, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getDatabase, saveDatabase };
