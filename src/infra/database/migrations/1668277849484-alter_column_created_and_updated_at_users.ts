import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterColumnCreatedAndUpdatedAtUsers1668277849484 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "created_at" TYPE timestamp with time zone');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "updated_at" TYPE timestamp with time zone');
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "created_at" TYPE timestamp');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "updated_at" TYPE timestamp');
  }
}
