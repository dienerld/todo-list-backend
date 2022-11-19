import { IUserRepository } from '@models/user/userRepository.interface';
import { CustomError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';
import { IJwtService } from '@presentation/interfaces/IJwtService';

class VerifyUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJwtService
  ) {}

  async handle (token: string): Promise<IHttpResponse> {
    try {
      const { id } = this.jwtService.decode(token);
      const user = await this.userRepository.findById(id);
      if (!user) { throw new NotFoundError('User') }

      user.verified = true;
      await this.userRepository.update(user);

      return HttpResponse.noContent();
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { VerifyUserUseCase };
