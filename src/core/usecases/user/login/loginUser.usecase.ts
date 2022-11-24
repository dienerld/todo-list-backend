import { IUserRepository } from '@models/user';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';
import { CustomError, NotFoundError } from '@presentation/errors';
import { IJwtService } from '@presentation/interfaces';

class LoginUserUsecase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJwtService

  ) {}

  async execute (userId: string, password: string): Promise<IHttpResponse> {
    try {
      if (!userId) {
        throw new CustomError('EmailError', 'User or password incorrect');
      }

      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundError('User');
      }

      if (user.password !== password) {
        throw new CustomError('PasswordError', 'User or password incorrect');
      }

      const token = this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name
        }
      );

      return HttpResponse.ok({ token });
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { LoginUserUsecase };
