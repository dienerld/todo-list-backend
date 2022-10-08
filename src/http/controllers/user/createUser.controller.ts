import { Response } from 'express';

import { CustomRequest } from '../../interfaces/customRequest';
import { UserRequestDto } from '@models/user/user.dtos';
import { CreateUserUseCase } from '@usecases/user/createUser.usecase';

class CreateUserController {
  constructor (private readonly createUser: CreateUserUseCase) {}

  async handle (request: CustomRequest, response: Response) {
    try {
      const userId = request.user?.id;
      if (userId) {
        return response.status(400).json({ error: 'User already exists' });
      }

      const { name, email, password, password_confirm }: UserRequestDto = request.body;
      const user = await this.createUser.execute({ name, email, password, password_confirm });

      return response.status(201).json(user);
    } catch (err: any) {
      return response.status(500).json({
        error: err.message || 'Internal Server Error'
      });
    }
  }
}

export { CreateUserController };
