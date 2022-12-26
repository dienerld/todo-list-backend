import { Response } from 'express';
import { FindUserUseCase } from '@usecases/user';
import { CustomRequest } from '../../../interfaces/customRequest';

class FindUserController {
  constructor (private readonly findUserUseCase: FindUserUseCase) {}

  async handle (request: CustomRequest, response: Response) {
    try {
      const userId = request.user?.id;
      if (!userId) {
        return response.status(400).json({ error: 'User not found' });
      }

      const { body, statusCode } = await this.findUserUseCase.execute(userId);

      return response.status(statusCode).json(body);
    } catch (err: any) {
      return response.status(400).json(
        { error: err.message || 'Unexpected error.' });
    }
  }
}

export { FindUserController };
