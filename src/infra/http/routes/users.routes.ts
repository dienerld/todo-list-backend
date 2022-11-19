import { Router } from 'express';

import {
  CreateUserController, DeleteUserController, GetUserController,
  LoginUserController, UpdateUserController
} from '../controllers/user';
import {
  CreateUserUseCase, DeleteUserUsecase, GetUserUseCase,
  LoginUserUsecase, UpdateUserUseCase
} from '@usecases/user';
import { hasAuthentication, UserAlreadyExistsMiddleware } from '../middleware';
import { CustomRequest } from '../interfaces/customRequest';
import { UserRepository } from '@database/repositories/user.repository';
import { MailTrapMailProvider } from '../../Providers/email/MailTrapMailProvider';
import { JWTService } from '../../Providers/jwt/jwt.provider';
import { VerifyUserUseCase } from '@usecases/user/verifyUser.usecase';
import { VerifyUserController } from '../controllers/user/verifyUser.controller';

const usersRouter = Router();

// Create User
usersRouter.post('/', new UserAlreadyExistsMiddleware().handle, async (req, res) => {
  const userRepo = new UserRepository();
  const mailProvider = new MailTrapMailProvider();
  const jwtService = new JWTService();
  const useCase = new CreateUserUseCase(userRepo, mailProvider, jwtService);
  const controller = new CreateUserController(useCase);

  return controller.handle(req, res);
});

// login User
usersRouter.post('/login', new UserAlreadyExistsMiddleware().handle, async (req, res) => {
  const userRepo = new UserRepository();
  const jwtService = new JWTService();
  const useCase = new LoginUserUsecase(userRepo, jwtService);
  const controller = new LoginUserController(useCase);

  return controller.handle(req, res);
});

// verify User
usersRouter.get('/:token/verify', (req, res) => {
  const userRepo = new UserRepository();
  const jwtService = new JWTService();
  const useCase = new VerifyUserUseCase(userRepo, jwtService);
  const controller = new VerifyUserController(useCase);

  return controller.handle(req, res);
});

// This route is protected by middleware
usersRouter.use(hasAuthentication);

// Get User
usersRouter.get('/', (req: CustomRequest, res) => {
  const userRepo = new UserRepository();
  const useCase = new GetUserUseCase(userRepo);
  const controller = new GetUserController(useCase);

  return controller.handle(req, res);
});

// Update User
usersRouter.put('/', (req, res) => {
  const userRepo = new UserRepository();
  const mailProvider = new MailTrapMailProvider();
  const useCase = new UpdateUserUseCase(userRepo, mailProvider);
  const controller = new UpdateUserController(useCase);

  return controller.handle(req, res);
});

// Delete User
usersRouter.delete('/', (req, res) => {
  const userRepo = new UserRepository();
  const useCase = new DeleteUserUsecase(userRepo);
  const controller = new DeleteUserController(useCase);

  return controller.handle(req, res);
});

export { usersRouter };
