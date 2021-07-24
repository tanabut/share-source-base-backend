"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo1626335449186 = void 0;
class demo1626335449186 {
    constructor() {
        this.name = 'demo1626335449186';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "demo" ("id" SERIAL NOT NULL, "demoCode" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdById" integer NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedById" integer NULL, CONSTRAINT "UQ_a3640679f9304540b78b62ec05f" UNIQUE ("demoCode"), CONSTRAINT "PK_a3640679f9304540b78b62ec05f" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "demo"`);
    }
}
exports.demo1626335449186 = demo1626335449186;
//# sourceMappingURL=1626335449186-demo.js.map