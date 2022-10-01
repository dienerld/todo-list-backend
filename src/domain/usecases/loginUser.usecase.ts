import { User } from '../models/user/user.model';

class LoginUserUsecase {
  async execute (user: User, password: string) {
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    const token = 'jwt_token';
    return token;
  }
}

export { LoginUserUsecase };
