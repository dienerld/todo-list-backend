import { GetAllTaskUseCase } from '@usecases/task/getAllTask.usecase';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class GetAllTaskController {
  constructor (private getAllTaskUseCase: GetAllTaskUseCase) {}

  async handle (req: CustomRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const tasks = await this.getAllTaskUseCase.execute(userId);

      return res.json(tasks);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}

export { GetAllTaskController };
