import jwt from 'jsonwebtoken';

import { jwtConfig } from '@configs/jwt';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';
import { IUserRepository } from '@models/user/userRepository.interface';
import { CustomError, NotFoundError } from '@presentation/errors';

class LoginUserUsecase {
  constructor (private readonly userRepository: IUserRepository) {}
  async execute (userId: string, password: string): Promise<IHttpResponse> {
    try {
      if (!userId) {
        throw new CustomError('EmailError', 'User or password incorrect');
      }

      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      if (user.password !== password) {
        throw new CustomError('PasswordError', 'User or password incorrect');
      }

      const token = jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
      }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn }
      );

      return HttpResponse.ok({ token });
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { LoginUserUsecase };