"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user1613485615401 = void 0;
class user1613485615401 {
    constructor() {
        this.name = 'User1613485615401';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'maintainer', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "role" "user_role_enum" NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdById" integer, "updatedById" integer, CONSTRAINT "UQ_5e568e001f9d1b91f67815c580f" UNIQUE ("username"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_451e60dbb932859a5df0206a542" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_457e2383403f43cf274ca4a43ee" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_457e2383403f43cf274ca4a43ee"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_451e60dbb932859a5df0206a542"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }
}
exports.user1613485615401 = user1613485615401;
//# sourceMappingURL=1613485615401-user.js.map