import { Response } from 'express';

import { DeleteTaskUseCase } from '@usecases/task';
import { CustomRequest } from '../../../interfaces/customRequest';

class DeleteTaskController {
  constructor (private deleteTaskUseCase: DeleteTaskUseCase) {}

  async handle (request: CustomRequest, response: Response): Promise<Response> {
    const taskId = request.params.id;
    const userId = request.user!.id;

    const { body, statusCode } = await this.deleteTaskUseCase.execute(userId, taskId);

    return response.status(statusCode).json(body);
  }
}

export { DeleteTaskController };
