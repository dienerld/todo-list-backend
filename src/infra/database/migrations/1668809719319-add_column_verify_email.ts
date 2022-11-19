import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addColumnVerifyEmail1668809719319 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'verified',
      type: 'boolean',
      default: false
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'verified');
  }
}
