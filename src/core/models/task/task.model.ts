/* eslint-disable no-unused-vars */
import { randomUUID } from 'crypto';
import { TTask } from './task.dtos';

class Task {
  id: string;
  title: string;
  done: boolean;
  hidden: boolean;
  date: Date;
  hour: string;

  constructor (title: string, date:Date, hour: string) {
    this.id = randomUUID();
    this.title = title;
    this.done = false;
    this.hidden = false;
    this.date = date;
    this.hour = hour;
  }

  static create (task: TTask) {
    const date = new Date(task.date);
    const newTask = new Task(task.title, date, task.hour);
    newTask.id = task.id;
    newTask.done = task.done;
    newTask.hidden = task.hidden;
    return newTask;
  }
}
export { Task };
