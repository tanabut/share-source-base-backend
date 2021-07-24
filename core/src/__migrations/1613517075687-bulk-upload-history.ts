import { MigrationInterface, QueryRunner } from 'typeorm';

export class bulkUploadHistory1613517075687 implements MigrationInterface {
  name = 'bulkUploadHistory1613517075687';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "bulk_upload_history_entity_enum" AS ENUM('product', 'dealer', 'productCategory', 'productDealer', 'banner', 'price', 'bannerDealer', 'productCategoryCatalog')`,
    );
    await queryRunner.query(
      `CREATE TYPE "bulk_upload_history_syncstatus_enum" AS ENUM('pending', 'success', 'error')`,
    );
    await queryRunner.query(
      `CREATE TABLE "bulk_upload_history" ("id" SERIAL NOT NULL, "entity" "bulk_upload_history_entity_enum" NOT NULL, "data" jsonb NOT NULL, "syncStatus" "bulk_upload_history_syncstatus_enum" NOT NULL DEFAULT 'pending', "syncError" text, "lastSyncedDate" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" integer, "updatedById" integer, CONSTRAINT "PK_8ae32d8251f46ae4a65a46f536d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "bulk_upload_history" ADD CONSTRAINT "FK_aa19530762cb1ae625a46ccfbdf" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bulk_upload_history" ADD CONSTRAINT "FK_73e2ebf3eb68a98eea85c1c2d86" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bulk_upload_history" DROP CONSTRAINT "FK_73e2ebf3eb68a98eea85c1c2d86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bulk_upload_history" DROP CONSTRAINT "FK_aa19530762cb1ae625a46ccfbdf"`,
    );
    await queryRunner.query(`DROP TABLE "bulk_upload_history"`);
    await queryRunner.query(`DROP TYPE "bulk_upload_history_syncstatus_enum"`);
    await queryRunner.query(`DROP TYPE "bulk_upload_history_entity_enum"`);
  }
}
