import { Response } from 'express';

import { UpdateTaskUseCase } from '@usecases/task/update/updateTask.usecase';
import { CustomRequest } from '../../../interfaces/customRequest';

class UpdateTaskController {
  constructor (private updateTask: UpdateTaskUseCase) {}

  async handle (req: CustomRequest, res: Response) {
    const idUser = req.user!.id;
    const idTask = req.params.id;
    const { title, date, hour, done, hidden } = req.body;

    const { body, statusCode } = await this.updateTask.execute(idUser, idTask, { title, date, hour, done, hidden });

    return res.status(statusCode).json(body);
  }
}

export { UpdateTaskController };
