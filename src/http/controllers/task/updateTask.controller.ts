import { UpdateTaskUseCase } from '@usecases/task/updateTask.usecase';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class UpdateTaskController {
  constructor (private updateTask: UpdateTaskUseCase) {}

  async handle (req: CustomRequest, res: Response) {
    const idUser = req.user!.id;
    const idTask = req.params.id;
    const { title, date, hour, done, hidden } = req.body;

    try {
      const task = await this.updateTask.execute(idUser, idTask, { title, date, hour, done, hidden });

      return res.json(task);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { UpdateTaskController };
