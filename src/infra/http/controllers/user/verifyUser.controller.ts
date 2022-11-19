import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';
import { VerifyUserUseCase } from '@usecases/user/verifyUser.usecase';

class VerifyUserController {
  constructor (private verifyUserUseCase: VerifyUserUseCase) {}

  async handle (request: CustomRequest, res: Response) {
    const { token } = request.params;
    const { body, statusCode } = await this.verifyUserUseCase.handle(token);

    return res.status(statusCode).json(body);
  }
}

export { VerifyUserController };
