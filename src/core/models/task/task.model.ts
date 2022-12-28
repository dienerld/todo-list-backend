/* eslint-disable no-unused-vars */
import { InvalidParamError } from '@presentation/errors';
import { randomUUID } from 'crypto';
import { MissingParamError } from '../../presentation/errors/missingParamsError';
import { TaskUpdateRequestDto } from './task.dtos';

class Task {
  id: string;
  title: string;
  done: boolean;
  hidden: boolean;
  date: Date;
  hour: string;
  created_at: Date;
  updated_at: Date;
  userId: string;

  private constructor (title: string, date:Date, hour: string, userId: string) {
    this.id = randomUUID();
    this.title = title;
    this.done = false;
    this.hidden = false;
    this.date = date;
    this.hour = hour;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.userId = userId;
  }

  // use to create user with validations -- previne error typeorm
  static create (title: string, date: Date, hour: string, userId: string): Task {
    if (!title.trim()) { throw new MissingParamError('Title') }
    if (!hour.trim()) { throw new MissingParamError('Hour') }
    if (!date) { throw new MissingParamError('Date') }

    return new Task(title, date, hour, userId);
  }

  update (task: Partial<TaskUpdateRequestDto>): void {
    if (task.date !== undefined) {
      this.date = task.date;
      this.updated_at = new Date();
    }
    if (task.hour !== undefined) {
      if (!task.hour.trim()) {
        throw new InvalidParamError('Hour');
      }
      this.hour = task.hour;
      this.updated_at = new Date();
    }
    if (task.title !== undefined) {
      if (!task.title.trim()) {
        throw new InvalidParamError('Title');
      }
      this.title = task.title;
      this.updated_at = new Date();
    }
    if (task.done !== undefined) {
      if (typeof task.done !== 'boolean') {
        throw new InvalidParamError('Done');
      }
      this.done = task.done;
      this.updated_at = new Date();
    }
    if (task.hidden !== undefined) {
      if (typeof task.hidden !== 'boolean') {
        throw new InvalidParamError('Hidden');
      }
      this.hidden = task.hidden;
      this.updated_at = new Date();
    }
  }
}
export { Task };
