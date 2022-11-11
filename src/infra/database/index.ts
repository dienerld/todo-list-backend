import { User } from '@models/user/user.model';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

// eslint-disable-next-line n/no-path-concat
const pathDB = path.resolve(`${__dirname}/database.json`);

const existsFile = () => {
  try {
    return existsSync(pathDB);
  } catch (error) {
    return false;
  }
};

export const Database = () => {
  function getDatabase (): User[] {
    try {
      if (!existsFile()) {
        return [];
      }
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

  return { getDatabase, saveDatabase };
};

export interface IDatabase {
  getDatabase: () => User[],
  saveDatabase: (data: User[]) => void
}
