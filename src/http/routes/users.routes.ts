import { Router } from 'express';
import { CreateUserUseCase } from '../../usecases/createUser.usecase';
import { CreateUserController } from '../controllers';
import { userAlreadyExistsMiddleware } from '../middleware/userAlreadyExistes';

const usersRouter = Router();

usersRouter.use(userAlreadyExistsMiddleware);

usersRouter.post('/', (req, res) => {
  const useCase = new CreateUserUseCase();
  const controller = new CreateUserController(useCase);
  return controller.handle(req, res);
});

usersRouter.get('/', (req, res) => {
  res.send('Hello World');
});

export { usersRouter };
