import { UpdateUserUseCase } from '@usecases/user';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class UpdateUserController {
  constructor (private updateUserUseCase: UpdateUserUseCase) {}

  async handle (req: CustomRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { email, name, password, password_confirm } = req.body;

      const user = await this.updateUserUseCase.execute(userId, { email, name, password, password_confirm });

      return res.json(user);
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
  }
}

export { UpdateUserController };
