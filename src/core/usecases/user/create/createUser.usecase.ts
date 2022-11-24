import { User, IUserRepository, UserRequestDto } from '@models/user';
import { CustomError, InvalidParamError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';
import { IJwtService, IMailProvider } from '@presentation/interfaces';
import { prettyBody } from '../html/bodyFormatted';

class CreateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly mailer: IMailProvider,
    private readonly jwtService: IJwtService
  ) {}

  async execute (userDto: UserRequestDto): Promise<IHttpResponse> {
    try {
      if (userDto.password !== userDto.password_confirm) {
        throw new InvalidParamError('Password does not match');
      }
      const userAlreadyExists = await this.userRepository.findByEmail(userDto.email);
      if (userAlreadyExists) { throw new InvalidParamError('Email already in use') }

      const user = new User(userDto.name, userDto.email, userDto.password);
      await this.userRepository.save(user);
      const tokenVerify = this.jwtService.sign({ id: user.id });

      this.mailer.sendMail({
        to: { name: user.name, email: user.email },
        subject: 'Account created',
        body: prettyBody('Click on the button below to confirm email', tokenVerify)
      });
      return HttpResponse.created(user);
    } catch (error) {
      if (error instanceof CustomError) {
        return HttpResponse.badRequest(error);
      }
      return HttpResponse.serverError(error);
    }
  }
}

export { CreateUserUseCase };
