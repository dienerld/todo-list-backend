import { FindAllTaskUseCase } from '@usecases/task';
import { Response } from 'express';
import { CustomRequest } from '../../interfaces/customRequest';

class GetAllTaskController {
  constructor (private findAllTaskUseCase: FindAllTaskUseCase) {}

  async handle (req: CustomRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { body, statusCode } = await this.findAllTaskUseCase.execute(userId);

      return res.status(statusCode).json(body);
    } catch (err: any) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}

export { GetAllTaskController };
