import { Response } from 'express';

import { CustomRequest } from '../../../interfaces/customRequest';
import { UserRequestDto } from '@models/user/user.dtos';
import { CreateUserUseCase } from '@usecases/user/create/createUser.usecase';
import { CustomError } from '@presentation/errors';

class CreateUserController {
  constructor (private readonly createUser: CreateUserUseCase) {}

  async handle (request: CustomRequest, response: Response) {
    try {
      const userId = request.user?.id;
      if (userId) {
        throw new CustomError('BadRequest', 'User already exists');
      }

      const { name, email, password, password_confirm }: UserRequestDto = request.body;
      const { body, statusCode } = await this.createUser.execute({ name, email, password, password_confirm });

      return response.status(statusCode).json(body);
    } catch (err: any) {
      if (err instanceof CustomError) {
        return response.status(400).json({ error: err.name, message: err.message });
      }
      return response.status(500).json({ error: 'ServerError', message: err.message });
    }
  }
}

export { CreateUserController };
