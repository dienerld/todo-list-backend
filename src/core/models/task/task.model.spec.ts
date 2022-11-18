import { MissingParamError } from '../../presentation/errors/missingParamsError';
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
      () => Task.create('Test', null, '12:00', 'any_id')
    ).toThrow(new MissingParamError('Date'));
  });
});
