import jwt from 'jsonwebtoken';

import { getDatabase } from '@database/index';

class LoginUserUsecase {
  async execute (userId: string, password: string) {
    const DB = getDatabase();

    const user = DB.users.find(user => user.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name
      },
      'secret', { expiresIn: '1d' });

    return token;
  }
}

export { LoginUserUsecase };
