import { Task } from './task.model';

describe('[Model] Task', () => {
  it('should create a new task', () => {
    const task = new Task('Test', new Date(), '12:00');

    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title', 'Test');
  });
});
