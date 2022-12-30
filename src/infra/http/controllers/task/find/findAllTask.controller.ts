import { FindAllTaskUseCase } from '@usecases/task';
import { Response } from 'express';
import { CustomRequest } from '../../../interfaces/customRequest';

class FindAllTaskController {
  constructor (private findAllTaskUseCase: FindAllTaskUseCase) {}

  async handle (req: CustomRequest, res: Response) {
    const userId = req.user!.id;
    const { body, statusCode } = await this.findAllTaskUseCase.execute(userId);

    return res.status(statusCode).json(body);
  }
}

export { FindAllTaskController };
