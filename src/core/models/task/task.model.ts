/* eslint-disable no-unused-vars */
import { randomUUID } from 'crypto';
import { TTask } from './task.dtos';

class Task {
  #id: string;
  #title: string;
  #done: boolean;
  #hidden: boolean;
  #date: Date;
  #hour: string;

  constructor (title: string, date:Date, hour: string) {
    this.#id = randomUUID();
    this.#title = title;
    this.#done = false;
    this.#hidden = false;
    this.#date = date;
    this.#hour = hour;
  }

  static create (task: TTask) {
    const date = new Date(task.date);
    const newTask = new Task(task.title, date, task.hour);
    newTask.#id = task.id;
    newTask.#done = task.done;
    newTask.#hidden = task.hidden;
    return newTask;
  }

  private set id (id: string) {
    this.#id = id;
  }

  get id () {
    return this.#id;
  }

  get title () {
    return this.#title;
  }

  set title (title: string) {
    this.#title = title;
  }

  toggleHidden () {
    this.#hidden = !this.#hidden;
  }

  get hidden () {
    return this.#hidden;
  }

  get date () {
    return this.#date;
  }

  set date (date: Date) {
    this.#date = date;
  }

  get hour () {
    return this.#hour;
  }

  set hour (hour: string) {
    this.#hour = hour;
  }

  get done () {
    return this.#done;
  }

  toggleDone () {
    this.#done = !this.#done;
  }

  toJSON () {
    return {
      id: this.#id,
      title: this.#title,
      date: this.#date,
      hour: this.#hour,
      done: this.#done,
      hidden: this.#hidden
    };
  }
}

export { Task };
