import { Task } from '@models/task/task.model';
import { randomUUID } from 'crypto';

class User {
  id: string;
  name: string;
  email: string;
  password: string;
  tasks: Task[];
  verified: boolean;
  created_at: Date;
  updated_at: Date;

  constructor (name: string, email: string, password: string) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.verified = false;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { User };
