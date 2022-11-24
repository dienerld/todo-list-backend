import { IUserRepository } from '@models/user';
import { CustomError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';

class FindUserUseCase {
  constructor (private readonly userRepository: IUserRepository) {}

  async execute (userId: string): Promise<IHttpResponse> {
    try {
      const user = await this.userRepository.findByIdWithTasks(userId);

      if (!user) {
        throw new NotFoundError('User');
      }

      return HttpResponse.ok(user);
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { FindUserUseCase };
