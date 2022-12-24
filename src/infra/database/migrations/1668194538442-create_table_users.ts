import { envs } from '@configs/env';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableUsers1668194538442 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'password',
          type: 'varchar'
        },
        {
          name: 'created_at',
          type: envs.env === 'test' ? 'datetime' : 'timestamp with time zone',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: envs.env === 'test' ? 'datetime' : 'timestamp with time zone',
          default: 'now()'
        }
      ]
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('users');
  }
}
