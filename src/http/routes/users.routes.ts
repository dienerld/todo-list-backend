import { Router } from 'express';

import { CustomRequest } from 'http/interfaces/customRequest';
import { hasAuthentication, userAlreadyExistsMiddleware } from 'http/middleware';
import {
  CreateUserController, GetUserController,
  LoginUserController, UpdateUserController
} from '../controllers/user';
import {
  CreateUserUseCase, GetUserUseCase,
  LoginUserUsecase, UpdateUserUseCase
} from '@usecases/user';

const usersRouter = Router();

usersRouter.use(userAlreadyExistsMiddleware);

// Create User
usersRouter.post('/', (req, res) => {
  const useCase = new CreateUserUseCase();
  const controller = new CreateUserController(useCase);

  return controller.handle(req, res);
});

// login User
usersRouter.post('/login', (req, res) => {
  const useCase = new LoginUserUsecase();
  const controller = new LoginUserController(useCase);

  return controller.handle(req, res);
});

// This route is protected by the middleware
usersRouter.use(hasAuthentication);

// Get User
usersRouter.get('/', (req: CustomRequest, res) => {
  const useCase = new GetUserUseCase();
  const controller = new GetUserController(useCase);

  return controller.handle(req, res);
});

// Update User
usersRouter.put('/:id', (req, res) => {
  const useCase = new UpdateUserUseCase();
  const controller = new UpdateUserController(useCase);

  return controller.handle(req, res);
});

export { usersRouter };
