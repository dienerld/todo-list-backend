import { DeleteTaskUseCase } from '@usecases/task';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class DeleteTaskController {
  constructor (private deleteTaskUseCase: DeleteTaskUseCase) {}

  async handle (request: CustomRequest, response: Response): Promise<Response> {
    const taskId = request.params.id;
    const userId = request.user!.id;

    try {
      const { body, statusCode } = await this.deleteTaskUseCase.execute(userId, taskId);

      return response.status(statusCode).json(body);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}

export { DeleteTaskController };
