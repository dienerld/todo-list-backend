import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableTasks1668194850044 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(new Table({
      name: 'tasks',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'title',
          type: 'varchar'
        },
        {
          name: 'done',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'hidden',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'date',
          type: 'timestamp'
        },
        {
          name: 'hour',
          type: 'varchar'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
          onUpdate: 'now()'
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: false
        }
      ],
      foreignKeys: [{
        name: 'FKUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('tasks');
  }
}
