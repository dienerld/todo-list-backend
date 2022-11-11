import { IDatabase } from '@database/index';
import { Task } from '@models/task/task.model';
import { User } from '@models/user/user.model';

class DatabaseMock {
  static users: User[] = [
    User.create({
      id: 'any_id',
      name: 'John Doe',
      email: 'any_mail@mail.com',
      password: 'any_password',
      tasks: [
        Task.create({
          id: 'valid_id',
          title: 'Test',
          date: new Date(),
          hour: '11:00',
          done: true,
          hidden: false
        })
      ]
    })
  ];

  static db (): IDatabase {
    function saveDatabase (data: User[]) { DatabaseMock.users = data; };
    function getDatabase (): User[] { return DatabaseMock.users; }
    return { getDatabase, saveDatabase };
  }
}

export { DatabaseMock };
