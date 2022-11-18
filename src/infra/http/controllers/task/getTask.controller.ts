import { FindWithFiltersUseCase } from '@usecases/task';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class GetTaskController {
  constructor (private getTaskUseCase: FindWithFiltersUseCase) {}

  async handle (req: CustomRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { body, statusCode } = await this.getTaskUseCase.execute(userId, req.query);

      return res.status(statusCode).json(body);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}

export { GetTaskController };
