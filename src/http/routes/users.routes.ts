import { Router } from 'express';

import { userAlreadyExistsMiddleware } from '../middleware/userAlreadyExistes';

import { CreateUserController } from '../controllers';
import { LoginUserController } from '../controllers/user/login.controller';
import { hasAuthentication } from '../middleware/hasAuth';
import { CustomRequest } from '../interfaces/customRequest';
import { LoginUserUsecase } from '@usecases/user/loginUser.usecase';
import { CreateUserUseCase } from '@usecases/user/createUser.usecase';
import { getDatabase } from '@database/index';

const usersRouter = Router();

usersRouter.get('/tasks', hasAuthentication, (req: CustomRequest, res) => {
  const userId = req.user!.id;
  console.log(userId);

  res.json(
    getDatabase().users.find((user) => user.id === userId)?.tasks || []
  );
});

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
