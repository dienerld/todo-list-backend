import { Task } from '@models/task/task.model';
import {
  ITaskRepository,
  TFiltersQuery,
  TResultFind
} from '@models/task/taskRepository.interface';
import { User } from '@models/user/user.model';
import { IUserRepository } from '@models/user/userRepository.interface';
import { NotFoundError } from '@presentation/errors';

function createUser () {
  const user = User.create('John Doe', 'john@mail.com', '12345');
  user.id = 'any_id';
  const task = Task.create('Test', new Date(), '01:01');
  task.id = 'any_task_id';
  user.tasks = [task];
  return user;
}
const users: User[] = [createUser()];
function resetUsers () {
  while (users.length > 0) {
    users.pop();
  }

  users.push(createUser());
}
class UserRepositoryMock implements IUserRepository {
  async findByIdWithTasks (id: string): Promise<User | null> {
    const user = users.find((user) => user.id === id);
    if (!user) throw new NotFoundError('User');

    return user;
  }

  async findById (id: string): Promise<User | null> {
    const user = users.find((user) => user.id === id);
    if (!user) throw new NotFoundError('User');
    user.tasks = [];
    return user;
  }

  async findByEmail (email: string): Promise<User | null> {
    return users.find((user) => user.email === email) || null;
  }

  async save (user: User): Promise<void> {
    users.push(user);
  }

  async update (user: User): Promise<void> {
    const index = users.findIndex((u) => u.id === user.id);
    users[index] = user;
  }

  async delete (id: string): Promise<void> {
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
  }
}

class TaskRepositoryMock implements ITaskRepository {
  async findWithFilters (userId: string, filters: TFiltersQuery): Promise<TResultFind> {
    const user = users.find((user) => user.id === userId);
    if (!user) throw new NotFoundError('User');

    if (Object.values(filters).length === 0) {
      return {
        tasks: user.tasks,
        total: user.tasks.length
      };
    }

    const tasks = user.tasks.filter((task) => {
      if (filters.title && !task.title.includes(filters.title)) return false;
      if (filters.date && task.date !== filters.date) return false;
      if (filters.hidden && task.hidden !== filters.hidden) return false;
      return true;
    });
    return {
      tasks,
      total: tasks.length
    };
  }

  async findById (id: string, userId: string): Promise<Task | null> {
    const user = users.find((user) => user.id === userId);
    if (!user) throw new NotFoundError('User');
    const task = user.tasks.find((task) => task.id === id);
    return task || null;
  }

  async findAll (userId: string): Promise<TResultFind> {
    const user = users.find((user) => user.id === userId);
    if (!user) throw new NotFoundError('User');
    return {
      tasks: user.tasks,
      total: user.tasks.length
    };
  }

  async save (userId: string, task: Task): Promise<void> {
    const user = users.find((user) => user.id === userId);
    if (!user) throw new NotFoundError('User');
    user.tasks.push(task);
  }

  async update (userId: string, task: Task): Promise<void> {
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) throw new NotFoundError('User');
    const taskIndex = users[userIndex].tasks.findIndex((t) => t.id === task.id);
    if (taskIndex === -1) throw new NotFoundError('Task');
    users[userIndex].tasks[taskIndex] = task;
  }

  async delete (id: string): Promise<void> {
    const userIndex = users.findIndex((user) =>
      user.tasks.find((task) => task.id === id)
    );
    if (userIndex === -1) return;
    const taskIndex = users[userIndex].tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return;
    users[userIndex].tasks.splice(taskIndex, 1);
  }
}

export { UserRepositoryMock, TaskRepositoryMock, users as UsersMock, resetUsers };
