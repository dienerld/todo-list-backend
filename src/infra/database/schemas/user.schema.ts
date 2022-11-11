import { User } from '@models/user/user.model';
import { EntitySchema } from 'typeorm';

const userSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid'
    },
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    created_at: {
      type: 'timestamp',
      default: 'now()'
    },
    updated_at: {
      type: 'timestamp',
      default: 'now()'
    }
  }
});

export { userSchema };
