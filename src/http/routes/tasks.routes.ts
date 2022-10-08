import { Router } from 'express';
import { CustomRequest } from '../interfaces/customRequest';
import { hasAuthentication } from '../middleware';

import { CreateTaskController, GetAllTaskController, UpdateTaskController } from '../controllers/task';
import { CreateTaskUseCase, UpdateTaskUseCase } from '@usecases/task';
import { GetAllTaskUseCase } from '@usecases/task/getAllTask.usecase';

const tasksRouter = Router();
// This route is protected by the middleware - user can access only after login
tasksRouter.use(hasAuthentication);

// Get tasks list for user
tasksRouter.get('/', (req: CustomRequest, res) => {
  const useCase = new GetAllTaskUseCase();
  const controller = new GetAllTaskController(useCase);

  return controller.handle(req, res);
});

// Create task
tasksRouter.post('/', (req: CustomRequest, res) => {
  const useCase = new CreateTaskUseCase();
  const controller = new CreateTaskController(useCase);

  return controller.handle(req, res);
});

// Update task
tasksRouter.put('/:id', (req: CustomRequest, res) => {
  const useCase = new UpdateTaskUseCase();
  const controller = new UpdateTaskController(useCase);

  return controller.handle(req, res);
});

export { tasksRouter };
