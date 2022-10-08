import { Router } from 'express';
import { CustomRequest } from '../interfaces/customRequest';
import { hasAuthentication } from '../middleware';

import { getDatabase } from '@database/index';

import { CreateTaskController, UpdateTaskController } from '../controllers/task';
import { CreateTaskUseCase, UpdateTaskUseCase } from '@usecases/task';

const tasksRouter = Router();

tasksRouter.use(hasAuthentication);

tasksRouter.get('/', (req: CustomRequest, res) => {
  const userId = req.user!.id;
  console.log(userId);

  res.json(
    getDatabase().find((user) => user.id === userId)?.tasks || []
  );
});

tasksRouter.post('/', (req: CustomRequest, res) => {
  const useCase = new CreateTaskUseCase();
  const controller = new CreateTaskController(useCase);

  return controller.handle(req, res);
});

tasksRouter.put('/:id', (req: CustomRequest, res) => {
  const useCase = new UpdateTaskUseCase();
  const controller = new UpdateTaskController(useCase);

  return controller.handle(req, res);
});

export { tasksRouter };
