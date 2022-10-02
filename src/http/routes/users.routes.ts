import { Router } from 'express';

import { userAlreadyExistsMiddleware } from '../middleware/userAlreadyExistes';

import { CreateUserUseCase } from '../../domain/usecases/createUser.usecase';
import { LoginUserUsecase } from '../../domain/usecases/loginUser.usecase';
import { CreateUserController } from '../controllers';
import { LoginUserController } from '../controllers/user/login.controller';
import { getDatabase } from '../../database';
import { hasAuthentication } from '../middleware/hasAuth';
import { CustomRequest } from '../interfaces/customRequest';

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
