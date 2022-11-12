import { DeleteUserUsecase } from '@usecases/user';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class DeleteUserController {
  constructor (private deleteUserUseCase: DeleteUserUsecase) {}

  async handle (request: CustomRequest, response: Response): Promise<Response> {
    try {
      const userId = request.user?.id!;

      const { body, statusCode } = await this.deleteUserUseCase.execute(userId);

      return response.status(statusCode).json(body);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}

export { DeleteUserController };
