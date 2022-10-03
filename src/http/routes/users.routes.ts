import { Router } from 'express';

import { getDatabase } from '@database/index';
import { userAlreadyExistsMiddleware } from '../middleware/userAlreadyExistes';

import { CreateUserController, LoginUserController } from '../controllers';

import { LoginUserUsecase } from '@usecases/user/loginUser.usecase';
import { CreateUserUseCase } from '@usecases/user/createUser.usecase';

const usersRouter = Router();

usersRouter.use(userAlreadyExistsMiddleware);

usersRouter.post('/', (req, res) => {
  const useCase = new CreateUserUseCase();
  const controller = new CreateUserController(useCase);

  return controller.handle(req, res);
});

usersRouter.post('/login', (req, res) => {
  const useCase = new LoginUserUsecase();
  const controller = new LoginUserController(useCase);

  return controller.handle(req, res);
});

usersRouter.get('/', (req, res) => {
  res.json(getDatabase().users);
});

export { usersRouter };
