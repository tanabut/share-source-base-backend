"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// TODO: Add logger profile
const logger_1 = require("@share-source-base/logger");
var logger_2 = require("@share-source-base/logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_2.logger; } });
// For backward compactibility
// TODO: Remove this when all files in core import from named export
// and others import logger from its own module
exports.default = logger_1.logger;
//# sourceMappingURL=logger.js.map