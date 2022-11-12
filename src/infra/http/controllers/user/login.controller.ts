import { Response } from 'express';

import { LoginUserUsecase } from '@usecases/user/loginUser.usecase';
import { CustomRequest } from '../../interfaces/customRequest';

class LoginUserController {
  constructor (private readonly loginUserUseCase: LoginUserUsecase) {}

  async handle (request: CustomRequest, response: Response): Promise<Response> {
    const userId = request.user?.id;
    if (!userId) {
      return response.status(400).json({ error: 'User not found' });
    }
    try {
      const { password } = request.body;
      const { body, statusCode } = await this.loginUserUseCase.execute(userId, password);

      return response.status(statusCode).json(body);
    } catch (err: any) {
      return response.status(400).json({ error: err.message || 'Unexpected error.' });
    }
  }
}

export { LoginUserController };
