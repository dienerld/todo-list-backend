import { Response } from 'express';
import { FindUserUseCase } from '@usecases/user';
import { CustomRequest } from '../../../interfaces/customRequest';

class FindUserController {
  constructor (private readonly findUserUseCase: FindUserUseCase) {}

  async handle (request: CustomRequest, response: Response) {
    const userId = request.user!.id;

    const { body, statusCode } = await this.findUserUseCase.execute(userId);

    return response.status(statusCode).json(body);
  }
}

export { FindUserController };
