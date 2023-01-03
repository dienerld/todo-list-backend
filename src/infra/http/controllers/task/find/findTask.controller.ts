import { FindWithFiltersUseCase } from '@usecases/task';
import { Response } from 'express';
import { CustomRequest } from '../../../interfaces/customRequest';

class FindTaskController {
  constructor (private findTaskUseCase: FindWithFiltersUseCase) {}

  async handle (req: CustomRequest, res: Response) {
    const userId = req.user!.id;
    const { body, statusCode } = await this.findTaskUseCase.execute(userId, req.query);

    return res.status(statusCode).json(body);
  }
}

export { FindTaskController };
