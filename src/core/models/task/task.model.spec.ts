import { MissingParamError } from '../../presentation/errors/missingParamsError';
import { Task } from './task.model';

describe('[Model] Task', () => {
  it('should create a new task', () => {
    const task = new Task('Test', new Date(), '12:00');

    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title', 'Test');
  });

  it('should throw if no title is provided', () => {
    expect(
      () => new Task('', new Date(), '12:00')
    ).toThrow(new MissingParamError('Title'));
  });

  it('should throw if no hour is provided', () => {
    expect(
      () => new Task('Test', new Date(), '')
    ).toThrow(new MissingParamError('Hour'));
  });

  it('should throw if no date is provided', () => {
    expect(
      () => new Task('Test', null, '12:00')
    ).toThrow(new MissingParamError('Date'));
  });
});
