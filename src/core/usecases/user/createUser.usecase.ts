import { UserRequestDto } from '@models/user/user.dtos';
import { User } from '@models/user/user.model';
import { IUserRepository } from '@models/user/userRepository.interface';
import { CustomError, InvalidParamError } from '@presentation/errors';
import { HttpResponse, IHttpResponse } from '@presentation/helpers';
import { IJwtService } from '@presentation/interfaces/IJwtService';
import { IMailProvider } from '@presentation/interfaces/IMailProvider';
import { prettyBody } from './html/bodyFormated';

class CreateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly mailer: IMailProvider,
    private readonly jwtService: IJwtService
  ) {}

  async execute (userDto: UserRequestDto): Promise<IHttpResponse> {
    if (userDto.password !== userDto.password_confirm) {
      throw new InvalidParamError('Password does not match');
    }

    const user = new User(userDto.name, userDto.email, userDto.password);
    try {
      await this.userRepository.save(user);
      const tokenVerify = this.jwtService.sign({ id: user.id });
      this.mailer.sendMail({
        to: { name: user.name, email: user.email },
        subject: 'Account created',
        body: prettyBody(`http://localhost:${process.env.PORT}/users/${tokenVerify}/verify`)
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
