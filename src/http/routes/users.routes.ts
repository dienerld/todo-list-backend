import { Router } from 'express';

import { userAlreadyExistsMiddleware } from '../middleware/userAlreadyExistes';

import { CreateUserController, LoginUserController } from '../controllers';
import { CreateUserUseCase } from '../../domain/usecases/user/createUser.usecase';
import { LoginUserUsecase } from '../../domain/usecases/user/loginUser.usecase';
import { getDatabase } from '../../database';

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
  res.json(getDatabase());
});

usersRouter.put('/:id', (req, res) => {
  res.status(200).json(getDatabase());
});
export { usersRouter };
