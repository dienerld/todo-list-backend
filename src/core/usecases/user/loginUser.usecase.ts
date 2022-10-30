import jwt from 'jsonwebtoken';

import { getDatabase } from '@database/index';
import { jwtConfig } from '@configs/jwt';

class LoginUserUsecase {
  async execute (userId: string, password: string) {
    try {
      const users = getDatabase();

      const user = users.find(user => user.id === userId);
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
        jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export { LoginUserUsecase };
