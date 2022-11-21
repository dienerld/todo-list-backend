import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterColumnCreatedAndUpdatedAtTasks1668277813506 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "tasks" ALTER COLUMN "created_at" TYPE timestamp with time zone');
    await queryRunner.query('ALTER TABLE "tasks" ALTER COLUMN "updated_at" TYPE timestamp with time zone');
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "tasks" ALTER COLUMN "created_at" TYPE timestamp');
    await queryRunner.query('ALTER TABLE "tasks" ALTER COLUMN "updated_at" TYPE timestamp');
  }
}
