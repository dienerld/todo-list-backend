import { CreateTaskUseCase } from '@usecases/task/createTask.usecase';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class CreateTaskController {
  constructor (private readonly createTask: CreateTaskUseCase) {}

  async handle (request: CustomRequest, response: Response) {
    try {
      const { title, hour, date } = request.body;

      const task = await this.createTask.execute(request.user!.id, { title, hour, date });

      return response.status(201).json(task);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}

export { CreateTaskController };
