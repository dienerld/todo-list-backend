import { GetUserUseCase } from '@usecases/user/getUser.usecase';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class GetUserController {
  constructor (private readonly getUserUseCase: GetUserUseCase) {}

  async handle (request: CustomRequest, response: Response) {
    try {
      const userId = request.user?.id;
      if (!userId) {
        return response.status(400).json({ error: 'User not found' });
      }

      const { body, statusCode } = await this.getUserUseCase.execute(userId);

      return response.status(statusCode).json(body);
    } catch (err: any) {
      return response.status(400).json(
        { error: err.message || 'Unexpected error.' });
    }
  }
}

export { GetUserController };
