import { Response } from 'express';

import { DeleteUserUsecase } from '@usecases/user';
import { CustomRequest } from '../../../interfaces/customRequest';

class DeleteUserController {
  constructor (private deleteUserUseCase: DeleteUserUsecase) {}

  async handle (request: CustomRequest, response: Response): Promise<Response> {
    const userId = request.user?.id!;

    const { body, statusCode } = await this.deleteUserUseCase.execute(userId);
    console.log('POS EXECUTE');

    return response.status(statusCode).json(body);
  }
}

export { DeleteUserController };
