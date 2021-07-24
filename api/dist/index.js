"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load config as the first thing to do
// eslint-disable-next-line import/order
require("./config");
const db_1 = require("@share-source-base/core/dist/db");
const app_1 = require("./app");
const config_1 = require("./config");
const logger_1 = require("./logger");
function registerProcessEvents(server, dbConnection) {
    process.on("uncaughtException", (error) => {
        logger_1.logger.error("UncaughtException", error);
    });
    process.on("unhandledRejection", (reason, promise) => {
        logger_1.logger.info(reason, promise);
    });
    process.on("SIGTERM", async () => {
        logger_1.logger.info("Starting graceful shutdown");
        server.close(async (err) => {
            const errors = [];
            let exitCode = 0;
            if (err) {
                errors.push(err);
            }
            try {
                await dbConnection.close();
            }
            catch (e) {
                errors.push(e);
            }
            if (errors.length > 1) {
                logger_1.logger.error("Error in graceful shutdown ", ...errors);
                exitCode = 1;
            }
            process.exit(exitCode);
        });
    });
}
async function startServer() {
    try {
        logger_1.logger.info("Starting API server");
        const dbConnection = await db_1.initDb();
        const app = app_1.createApp();
        const server = app.listen(config_1.PORT, () => {
            logger_1.logger.info(`Application running on port: ${config_1.PORT}`);
        });
        registerProcessEvents(server, dbConnection);
    }
    catch (e) {
        logger_1.logger.error(e, "An error occurred while initializing application.");
    }
}
startServer();
//# sourceMappingURL=index.js.map