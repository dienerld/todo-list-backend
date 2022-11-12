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
  user_id: string;

  private constructor (title: string, date:Date, hour: string, user_id: string) {
    this.id = randomUUID();
    this.title = title;
    this.done = false;
    this.hidden = false;
    this.date = date;
    this.hour = hour;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.user_id = user_id;
  }

  static create (title: string, date:Date, hour: string, user_id: string): Task {
    if (!title) { throw new MissingParamError('Title'); }
    if (!hour) { throw new MissingParamError('Hour'); }
    if (!date) { throw new MissingParamError('Date'); }
    if (!user_id) { throw new MissingParamError('User ID'); }

    return new Task(title, date, hour, user_id);
  }

  update (task: Partial<TaskUpdateRequestDto>): void {
    console.log(task);
    if (task.date) {
      this.date = task.date;
      this.updated_at = new Date();
    }
    if (task.hour) {
      this.hour = task.hour;
      this.updated_at = new Date();
    }
    if (task.title) {
      this.title = task.title;
      this.updated_at = new Date();
    }
    if (task.done) {
      this.done = !task.done;
      this.updated_at = new Date();
    }
    if (task.hidden) {
      this.hidden = !task.hidden;
      this.updated_at = new Date();
    }
  }
}
export { Task };
