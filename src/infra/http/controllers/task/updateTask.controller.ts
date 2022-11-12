import { CustomError } from '@presentation/errors';
import { HttpResponse } from '@presentation/helpers';
import { UpdateTaskUseCase } from '@usecases/task/updateTask.usecase';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class UpdateTaskController {
  constructor (private updateTask: UpdateTaskUseCase) {}

  async handle (req: CustomRequest, res: Response) {
    try {
      const idUser = req.user!.id;
      const idTask = req.params.id;
      const { title, date, hour, done, hidden } = req.body;

      const { body, statusCode } = await this.updateTask.execute(idUser, idTask, { title, date, hour, done, hidden });

      return res.status(statusCode).json(body);
    } catch (err: any) {
      if (err instanceof CustomError) {
        return HttpResponse.badRequest(err);
      }
      return HttpResponse.serverError(err);
    }
  }
}

export { UpdateTaskController };
