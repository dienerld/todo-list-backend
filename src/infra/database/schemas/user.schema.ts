import { User } from '@models/user/user.model';
import { EntitySchema } from 'typeorm';

const userSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      generated: 'uuid'
    },
    name: {
      type: 'varchar'
    },
    email: {
      type: 'varchar',
      unique: true
    },
    password: {
      type: 'varchar'
    },
    created_at: {
      type: 'timestamp',
      default: 'now()'
    },
    verified: {
      type: 'boolean',
      default: false
    },
    updated_at: {
      type: 'timestamp',
      default: 'now()',
      onUpdate: 'now()'
    }
  },
  relations: {
    tasks: {
      type: 'one-to-many',
      target: 'Task',
      inverseSide: 'user_id',
      joinColumn: {
        name: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }

});

export { userSchema };
