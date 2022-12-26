import { CreateTaskUseCase } from '@usecases/task';
import { Response } from 'express';
import { CustomRequest } from '../../../interfaces/customRequest';

class CreateTaskController {
  constructor (private readonly createTask: CreateTaskUseCase) {}

  async handle (request: CustomRequest, response: Response) {
    const { title, hour, date } = request.body;

    const { body, statusCode } = await this.createTask.execute(request.user!.id, { title, hour, date });

    return response.status(statusCode).json(body);
  }
}

export { CreateTaskController };
