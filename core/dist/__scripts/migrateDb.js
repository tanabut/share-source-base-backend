"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const logger_1 = require("../logger");
// TODO : Extract this to common workspace
function registerProcessEvents() {
    process.on('uncaughtException', (error) => {
        logger_1.logger.error('UncaughtException', error);
    });
    process.on('unhandledRejection', (reason, promise) => {
        logger_1.logger.info(reason, promise);
    });
    process.on('SIGTERM', async () => {
        logger_1.logger.info('Starting graceful shutdown');
    });
}
async function migrateDb() {
    const connection = await db_1.initDb({
        ...db_1.dbConfig,
        migrations: ['dist/__migrations/*.js'],
        cli: {
            migrationsDir: 'dist/__migrations',
        },
    });
    logger_1.logger.info(`Running migrations on "${db_1.dbConfig.database}"`);
    await connection.runMigrations({});
    await connection.close();
}
registerProcessEvents();
migrateDb()
    .then(() => {
    process.exit();
})
    .catch(err => {
    // TODO: logger.error for err object is not working
    logger_1.logger.error(err);
    process.exit(1);
});
//# sourceMappingURL=migrateDb.js.map