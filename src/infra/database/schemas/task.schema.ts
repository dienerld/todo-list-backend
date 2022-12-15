import { Task } from '@models/task/task.model';
import { EntitySchema } from 'typeorm';

const taskSchema = new EntitySchema<Task>({
  name: 'Task',
  tableName: 'tasks',
  target: Task,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    },
    title: {
      type: 'varchar'
    },
    date: {
      type: 'date'
    },
    done: {
      type: 'boolean'
    },
    hidden: {
      type: 'boolean'
    },
    hour: {
      type: 'varchar'
    },
    created_at: {
      type: 'timestamp',
      default: 'now()'
    },
    updated_at: {
      type: 'timestamp',
      default: 'now()',
      onUpdate: 'now()'
    },
    userId: {
      name: 'user_id',
      type: 'uuid',
      nullable: false
    }
  },
  relations: {
    userId: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'user_id'
      }
    }
  }
});

export { taskSchema };
