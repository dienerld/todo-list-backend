import { IUserRepository } from '@models/user';
import { CustomError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';

class DeleteUserUsecase {
  constructor (private readonly userRepository: IUserRepository) {}

  async execute (userId: string): Promise<IHttpResponse> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }
      await this.userRepository.delete(userId);

      return HttpResponse.noContent();
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { DeleteUserUsecase };
