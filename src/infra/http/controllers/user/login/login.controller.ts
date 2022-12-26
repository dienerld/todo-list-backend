import { Response } from 'express';
import { MissingParamError, NotFoundError } from '@presentation/errors';
import { LoginUserUsecase } from '@usecases/user';

import { CustomRequest } from '../../../interfaces/customRequest';

class LoginUserController {
  constructor (private readonly loginUserUseCase: LoginUserUsecase) {}

  async handle (request: CustomRequest, response: Response): Promise<Response> {
    const userId = request.user?.id;
    const { email, password } = request.body;
    if (!email) {
      const error = new MissingParamError('Email');
      return response.status(400).json({
        error: error.name,
        message: error.message
      });
    }

    if (!password) {
      const error = new MissingParamError('Password');
      return response.status(400).json({
        error: error.name,
        message: error.message
      });
    }

    if (!userId) {
      const error = new NotFoundError('User');
      return response.status(400).json({
        error: error.name,
        message: error.message
      });
    }

    const { body, statusCode } = await this.loginUserUseCase.execute(userId, password);

    return response.status(statusCode).json(body);
  }
}

export { LoginUserController };
