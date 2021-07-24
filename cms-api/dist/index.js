"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Load config as the first thing to do
// eslint-disable-next-line import/order
require('./config');
const app_1 = require("./app");
const config_1 = require("./config");
const logger_1 = require("./logger");
async function startServer() {
    const { app } = await app_1.initApp();
    app.listen(config_1.PORT, () => logger_1.logger.debug(`Application listening on port: ${config_1.PORT}`));
}
startServer();
//# sourceMappingURL=index.js.map