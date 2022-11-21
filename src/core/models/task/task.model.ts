/* eslint-disable no-unused-vars */
import { randomUUID } from 'crypto';
import { MissingParamError } from '../../presentation/errors/missingParamsError';
import { TaskUpdateRequestDto, TTask } from './task.dtos';

class Task {
  id: string;
  title: string;
  done: boolean;
  hidden: boolean;
  date: Date;
  hour: string;
  created_at: Date;
  updated_at: Date;

  private constructor (title: string, date:Date, hour: string) {
    this.id = randomUUID();
    this.title = title;
    this.done = false;
    this.hidden = false;
    this.date = date;
    this.hour = hour;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  // use to create user with validations -- previne error typeorm
  static create (title: string, date:Date, hour: string): Task {
    if (!title.trim()) { throw new MissingParamError('Title') }
    if (!hour.trim()) { throw new MissingParamError('Hour') }
    if (!date) { throw new MissingParamError('Date') }

    return new Task(title, date, hour);
  }

  update (task: Partial<TaskUpdateRequestDto>): void {
    if (task.date !== undefined) {
      this.date = task.date;
      this.updated_at = new Date();
    }
    if (task.hour !== undefined) {
      this.hour = task.hour;
      this.updated_at = new Date();
    }
    if (task.title !== undefined) {
      this.title = task.title;
      this.updated_at = new Date();
    }
    if (task.done !== undefined) {
      this.done = task.done;
      this.updated_at = new Date();
    }
    if (task.hidden !== undefined) {
      this.hidden = task.hidden;
      this.updated_at = new Date();
    }
  }
}
export { Task };
