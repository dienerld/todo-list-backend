import { Response } from 'express';
import { UpdateUserUseCase } from '@usecases/user';
import { CustomRequest } from '../../interfaces/customRequest';

class UpdateUserController {
  constructor (private updateUserUseCase: UpdateUserUseCase) {}

  async handle (request: CustomRequest, res: Response) {
    try {
      const userId = request.user!.id;
      const { email, name, password, password_confirm } = request.body;

      const { body, statusCode } = await this.updateUserUseCase.execute(userId, { email, name, password, password_confirm });

      return res.status(statusCode).json(body);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || 'Unexpected error.' });
    }
  }
}

export { UpdateUserController };
