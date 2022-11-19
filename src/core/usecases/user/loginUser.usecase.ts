import { HttpResponse, IHttpResponse } from '@presentation/helpers';
import { IUserRepository } from '@models/user/userRepository.interface';
import { CustomError } from '@presentation/errors';
import { IJwtService } from '@presentation/interfaces/IJwtService';

class LoginUserUsecase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJwtService

  ) {}

  async execute (userId: string, password: string): Promise<IHttpResponse> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      if (user.password !== password) {
        throw new Error('Invalid password');
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
