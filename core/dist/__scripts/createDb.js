"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDb = void 0;
const config_1 = require("../config");
const db_1 = require("../db");
const logger_1 = require("../logger");
async function createDb() {
    const newConfig = { ...db_1.dbConfig };
    delete newConfig.database;
    const client = await db_1.initDb(newConfig);
    if (!client) {
        return;
    }
    await client.query(`CREATE DATABASE ${config_1.DATABASE_NAME}`);
    await client.query(`CREATE DATABASE ${config_1.TEST_DATABASE_NAME}`);
    logger_1.logger.info(`Created databases : ${config_1.DATABASE_NAME} and ${config_1.TEST_DATABASE_NAME}`);
    client.close();
}
exports.createDb = createDb;
createDb();
//# sourceMappingURL=createDb.js.map