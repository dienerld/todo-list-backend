import { UserRequestDto, IUserRepository } from '@models/user';
import { CustomError, InvalidParamError, NotFoundError } from '@presentation/errors';
import { HttpResponse, IHttpResponse, regexEmail, regexName } from '@presentation/helpers';
import { IJwtService, IMailProvider } from '@presentation/interfaces';
import { prettyBody } from '../html/bodyFormatted';

class UpdateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly mailer: IMailProvider,
    private readonly jwtService: IJwtService
  ) {}

  async execute (userId: string, userDto: Partial<UserRequestDto>): Promise<IHttpResponse> {
    try {
      const user = await this.userRepository.findById(userId);
      let changedEmail = false;

      if (!user) {
        throw new NotFoundError('User not found');
      }
      if (userDto.name !== undefined) {
        if (!userDto.name.match(regexName)) { throw new InvalidParamError('Name') }
        user.name = userDto.name;
      }

      if (userDto.email !== undefined) {
        if (!userDto.email.match(regexEmail)) { throw new InvalidParamError('Email') }
        user.email = userDto.email;
        user.verified = false;
        changedEmail = true;
      }

      if (userDto.password !== undefined || userDto.password_confirm !== undefined) {
        if (userDto.password !== userDto.password_confirm) {
          throw new InvalidParamError('Password does not match');
        }
        user.password = userDto.password!;
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
