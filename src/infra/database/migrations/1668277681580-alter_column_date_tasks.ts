import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterColumnDateTasks1668277681580 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "tasks" ALTER COLUMN "date" TYPE timestamp with time zone');
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "tasks" ALTER COLUMN "date" TYPE timestamp');
  }
}
