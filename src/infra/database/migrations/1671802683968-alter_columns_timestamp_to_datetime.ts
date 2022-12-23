import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterColumnsTimestampToDatetime1671802683968 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('users', 'created_at', new TableColumn({
      name: 'created_at',
      type: 'datetime'
    }));

    await queryRunner.changeColumn('users', 'updated_at', new TableColumn({
      name: 'updated_at',
      type: 'datetime'
    }));

    await queryRunner.changeColumn('tasks', 'created_at', new TableColumn({
      name: 'created_at',
      type: 'datetime'
    }));

    await queryRunner.changeColumn('tasks', 'updated_at', new TableColumn({
      name: 'updated_at',
      type: 'datetime'
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('users', 'created_at', new TableColumn({
      name: 'created_at',
      type: 'timestamp'
    }));

    await queryRunner.changeColumn('users', 'updated_at', new TableColumn({
      name: 'updated_at',
      type: 'timestamp'
    }));

    await queryRunner.changeColumn('tasks', 'created_at', new TableColumn({
      name: 'created_at',
      type: 'timestamp'
    }));

    await queryRunner.changeColumn('tasks', 'updated_at', new TableColumn({
      name: 'updated_at',
      type: 'timestamp'
    }));
  }
}
