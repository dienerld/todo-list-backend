import { DeleteUserUsecase } from '@usecases/user';
import { Response } from 'express';
import { CustomRequest } from 'http/interfaces/customRequest';

class DeleteUserController {
  constructor (private deleteUserUseCase: DeleteUserUsecase) {}

  async handle (request: CustomRequest, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      await this.deleteUserUseCase.execute(id);

      return response.status(204).send();
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}

export { DeleteUserController };
