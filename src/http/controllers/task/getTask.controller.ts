import { GetTaskUseCase } from '@usecases/task/getTask.usecase';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

type TParamsRequest = {
  hidden: string
  title: string
}
class GetTaskController {
  constructor (private getTaskUseCase: GetTaskUseCase) {}

  async handle (req: CustomRequest, res: Response) {
    try {
      const userId = req.user!.id;
      // @ts-expect-error
      const { hidden, title }: TParamsRequest = req.query;
      const bool = hidden === 'true';
      const tasks = await this.getTaskUseCase.execute(userId, bool, title);

      return res.json(tasks);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}

export { GetTaskController };
