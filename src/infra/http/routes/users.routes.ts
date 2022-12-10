import { Router } from 'express';

import {
  CreateUserController, DeleteUserController, FindUserController,
  LoginUserController, UpdateUserController
} from '../controllers/user';
import {
  CreateUserUseCase, DeleteUserUsecase, FindUserUseCase,
  LoginUserUsecase, UpdateUserUseCase
} from '@usecases/user';
import { hasAuthentication, UserAlreadyExistsMiddleware } from '../middleware';
import { CustomRequest } from '../interfaces/customRequest';
import { UserRepository } from '@database/repositories/user.repository';
import { RedisRepository } from '../../cache/redis.repository';

const usersRouter = Router();

usersRouter.use(new UserAlreadyExistsMiddleware().handle);

// Create User
usersRouter.post('/', async (req, res) => {
  const userRepo = new UserRepository();
  const useCase = new CreateUserUseCase(userRepo);
  const controller = new CreateUserController(useCase);

  return controller.handle(req, res);
});

// login User
usersRouter.post('/login', (req, res) => {
  const userRepo = new UserRepository();
  const useCase = new LoginUserUsecase(userRepo);
  const controller = new LoginUserController(useCase);

  return controller.handle(req, res);
});

// This route is protected by the middleware
usersRouter.use(hasAuthentication);

// Get User
usersRouter.get('/', (req: CustomRequest, res) => {
  const userRepo = new UserRepository();
  const cacheRepo = new RedisRepository();
  const useCase = new FindUserUseCase(userRepo, cacheRepo);
  const controller = new FindUserController(useCase);

  return controller.handle(req, res);
});

// Update User
usersRouter.put('/', (req, res) => {
  const userRepo = new UserRepository();
  const useCase = new UpdateUserUseCase(userRepo);
  const controller = new UpdateUserController(useCase);

  return controller.handle(req, res);
});

// Delete User
usersRouter.delete('/', (req, res) => {
  const userRepo = new UserRepository();
  const cacheRepo = new RedisRepository();
  const useCase = new DeleteUserUsecase(userRepo, cacheRepo);
  const controller = new DeleteUserController(useCase);

  return controller.handle(req, res);
});

export { usersRouter };
