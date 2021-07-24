import { MigrationInterface, QueryRunner } from 'typeorm';

export class demo1626335449186
  implements MigrationInterface {
  name = 'demo1626335449186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "demo" ("id" SERIAL NOT NULL, "demoCode" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdById" integer NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedById" integer NULL, CONSTRAINT "UQ_a3640679f9304540b78b62ec05f" UNIQUE ("demoCode"), CONSTRAINT "PK_a3640679f9304540b78b62ec05f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "demo"`);
  }
}
