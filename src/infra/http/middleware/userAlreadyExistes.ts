import { UserRepository } from '@database/repositories/user.repository';
import { CustomError } from '@presentation/errors';
import { HttpResponse } from '@presentation/helpers';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../interfaces/customRequest';

class UserAlreadyExistsMiddleware {
  async handle (req: CustomRequest, res: Response, next: NextFunction) {
    const { email } = req.body;
    try {
      const repository = new UserRepository();
      const user = await repository.findByEmail(email);

      req.user = user;

      return next();
    } catch (error) {
      if (error instanceof CustomError) {
        return res.json(HttpResponse.badRequest(error));
      }
      return res.json(HttpResponse.serverError(error));
    }
  }
}

export { UserAlreadyExistsMiddleware };
