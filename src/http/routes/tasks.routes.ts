import { Router } from 'express';
import { CustomRequest } from '../interfaces/customRequest';

import { getDatabase } from '@database/index';
import { hasAuthentication } from '../middleware/hasAuth';
import { CreateTaskUseCase } from '@usecases/task/createTask.usecase';
import { CreateTaskController } from '../controllers';

const tasksRouter = Router();

tasksRouter.use(hasAuthentication);

tasksRouter.get('/', (req: CustomRequest, res) => {
  const userId = req.user!.id;
  console.log(userId);

  res.json(
    getDatabase().users.find((user) => user.id === userId)?.tasks || []
  );
});

tasksRouter.post('/', (req: CustomRequest, res) => {
  const useCase = new CreateTaskUseCase();
  const controller = new CreateTaskController(useCase);

  return controller.handle(req, res);
});

export { tasksRouter };
