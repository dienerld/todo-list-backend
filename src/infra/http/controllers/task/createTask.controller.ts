import { CreateTaskUseCase } from '@usecases/task';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class CreateTaskController {
  constructor (private readonly createTask: CreateTaskUseCase) {}

  async handle (request: CustomRequest, response: Response) {
    try {
      const { title, hour, date } = request.body;

      const { body, statusCode } = await this.createTask.execute(request.user!.id, { title, hour, date });

      return response.status(statusCode).json(body);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}

export { CreateTaskController };
