import { CreateTaskUseCase } from '@usecases/task/createTask.usecase';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class CreateTaskController {
  constructor (private readonly createTask: CreateTaskUseCase) {}

  async handle (request: CustomRequest, response: Response) {
    const { title, hour, date } = request.body;

    const task = await this.createTask.execute(request.user!.id, { title, hour, date });

    return response.status(201).json(task);
  }
}

export { CreateTaskController };
