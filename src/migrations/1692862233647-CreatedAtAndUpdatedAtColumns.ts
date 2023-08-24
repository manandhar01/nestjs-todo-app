import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedAtAndUpdatedAtColumns1692862233647
  implements MigrationInterface
{
  name = 'CreatedAtAndUpdatedAtColumns1692862233647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "created_at"`);
  }
}
