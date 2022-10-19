import { UpdateUserUseCase } from '@usecases/user';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class UpdateUserController {
  constructor (private updateUserUseCase: UpdateUserUseCase) {}

  async handle (request: CustomRequest, res: Response) {
    try {
      const userId = request.user!.id;
      const { email, name, password, password_confirm } = request.body;

      const user = await this.updateUserUseCase.execute(userId, { email, name, password, password_confirm });

      return res.json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || 'Unexpected error.' });
    }
  }
}

export { UpdateUserController };
