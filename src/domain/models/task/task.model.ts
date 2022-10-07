/* eslint-disable no-unused-vars */
import { randomUUID } from 'crypto';

enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

class Task {
  #id: string;
  #title: string;
  #description: string;
  #status: TaskStatus;
  #hidden: boolean;

  constructor (title: string, description: string) {
    this.#id = randomUUID();
    this.#title = title;
    this.#description = description;
    this.#status = TaskStatus.PENDING;
    this.#hidden = false;
  }

  static create (task: Task) {
    const newTask = new Task(task.title, task.description);
    newTask.#id = task.id;
    newTask.#status = task.status;
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

  get description () {
    return this.#description;
  }

  toggleHidden () {
    this.#hidden = !this.#hidden;
  }

  get hidden () {
    return this.#hidden;
  }

  set description (description: string) {
    this.#description = description;
  }

  get status () {
    return this.#status;
  }

  set status (status: TaskStatus) {
    this.#status = status;
  }

  toJSON () {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      status: this.#status,
      hidden: this.#hidden
    };
  }
}

export { Task, TaskStatus };
