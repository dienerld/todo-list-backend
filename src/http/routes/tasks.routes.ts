import { Router } from 'express';
import { hasAuthentication } from '../middleware';

import {
  CreateTaskController, DeleteTaskController,
  GetAllTaskController, UpdateTaskController
} from '../controllers/task';
import {
  CreateTaskUseCase, DeleteTaskUseCase,
  GetAllTaskUseCase, UpdateTaskUseCase
} from '@usecases/task';

const tasksRouter = Router();
// This route is protected by the middleware - user can access only after login
tasksRouter.use(hasAuthentication);

// Get tasks list for user
tasksRouter.get('/', (req, res) => {
  const useCase = new GetAllTaskUseCase();
  const controller = new GetAllTaskController(useCase);

  return controller.handle(req, res);
});

// Create task
tasksRouter.post('/', (req, res) => {
  const useCase = new CreateTaskUseCase();
  const controller = new CreateTaskController(useCase);

  return controller.handle(req, res);
});

// Update task
tasksRouter.put('/:id', (req, res) => {
  const useCase = new UpdateTaskUseCase();
  const controller = new UpdateTaskController(useCase);

  return controller.handle(req, res);
});

// Delete task
tasksRouter.delete('/:id', (req, res) => {
  const useCase = new DeleteTaskUseCase();
  const controller = new DeleteTaskController(useCase);

  return controller.handle(req, res);
});

export { tasksRouter };
