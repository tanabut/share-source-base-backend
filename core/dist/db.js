"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManager = exports.getConnection = exports.initDb = exports.dbConfig = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const collection_1 = __importDefault(require("./entities/collection"));
const logger_1 = require("./logger");
exports.dbConfig = {
    type: 'postgres',
    host: config_1.DATABASE_HOST,
    port: 5432,
    database: config_1.NODE_ENV === 'test' ? config_1.TEST_DATABASE_NAME : config_1.DATABASE_NAME,
    username: config_1.DATABASE_USER,
    password: config_1.DATABASE_PASSWORD,
    entities: collection_1.default,
    synchronize: false,
    logging: config_1.DEBUG_DATABASE ? 'all' : ['error'],
};
async function initDb(customConfig) {
    const connection = await typeorm_1.createConnection(customConfig || exports.dbConfig);
    if (connection.options.database) {
        logger_1.logger.debug(`Connected to database: "${connection.options.database}"`);
    }
    return connection;
}
exports.initDb = initDb;
exports.getConnection = typeorm_1.getConnection;
const getManager = async () => {
    const connection = exports.getConnection();
    return connection.manager;
};
exports.getManager = getManager;
//# sourceMappingURL=db.js.map