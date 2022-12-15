import { MissingParamError } from '@presentation/errors';
import { Task } from './task.model';

describe('[Model] Task', () => {
  it('should create a new task', () => {
    const task = Task.create('Test', new Date(), '12:00', 'any_id');

    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title', 'Test');
  });

  it('should throw if no title is provided', () => {
    expect(
      () => Task.create('', new Date(), '12:00', 'any_id')
    ).toThrow(new MissingParamError('Title'));
  });

  it('should throw if no hour is provided', () => {
    expect(
      () => Task.create('Test', new Date(), '', 'any_id')
    ).toThrow(new MissingParamError('Hour'));
  });

  it('should throw if no date is provided', () => {
    expect(
      () => Task.create('Test', null as unknown as Date, '12:00', 'any_id')
    ).toThrow(new MissingParamError('Date'));
  });

  it('should update date', async () => {
    const date = new Date(Date.now() - 1000 * 60 * 60);
    const task = Task.create('Test', date, '12:00', 'any_id');

    task.update({ date: new Date() });

    expect(task).toHaveProperty('date');
    expect(task.date).not.toEqual(date);
  });

  it('should update hour', async () => {
    const task = Task.create('Test', new Date(), '12:00', 'any_id');

    task.update({ hour: '13:00' });

    expect(task).toHaveProperty('hour', '13:00');
  });

  it('should update title', async () => {
    const task = Task.create('Test', new Date(), '12:00', 'any_id');

    task.update({ title: 'Test 2' });

    expect(task).toHaveProperty('title', 'Test 2');
  });

  it('should update done', async () => {
    const task = Task.create('Test', new Date(), '12:00', 'any_id');

    task.update({ done: true });

    expect(task).toHaveProperty('done', true);
  });

  it('should update hidden', async () => {
    const task = Task.create('Test', new Date(), '12:00', 'any_id');

    task.update({ hidden: true });

    expect(task).toHaveProperty('hidden', true);
  });
});
