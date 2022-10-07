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
      const token = await this.loginUserUseCase.execute(userId, password);

      return response.json({ token });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { LoginUserController };
