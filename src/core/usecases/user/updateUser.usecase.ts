import { UserRequestDto } from '@models/user/user.dtos';
import { IUserRepository } from '@models/user/userRepository.interface';
import { CustomError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';
import { IJwtService } from '@presentation/interfaces/IJwtService';
import { IMailProvider } from '@presentation/interfaces/IMailProvider';
import { prettyBody } from './html/bodyFormatted';

class UpdateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly mailer: IMailProvider,
    private readonly jwtService: IJwtService
  ) {}

  async execute (userId: string, userDto: UserRequestDto): Promise<IHttpResponse> {
    try {
      const user = await this.userRepository.findById(userId);
      let changedEmail = false;

      if (!user) {
        throw new NotFoundError('User not found');
      }
      if (userDto.name) {
        user.name = userDto.name;
      }

      if (userDto.email) {
        user.email = userDto.email;
        user.verified = false;
        changedEmail = true;
      }

      if (userDto.password) {
        if (userDto.password !== userDto.password_confirm) {
          throw new Error('Password does not match');
        }
        user.password = userDto.password;
      }

      await this.userRepository.update(user);

      if (changedEmail) {
        const tokenVerify = this.jwtService.sign({ id: user.id });
        const title = 'Email changed, please confirm new email';
        this.mailer.sendMail({
          to: { name: user.name, email: user.email },
          subject: 'Email Changed',
          body: prettyBody(title, tokenVerify)
        });
      }

      return HttpResponse.noContent();
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { UpdateUserUseCase };
