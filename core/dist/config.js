"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPERADMIN_PASSWORD = exports.SUPERADMIN_USERNAME = exports.MAX_PRODUCT_IMAGE_SIZE = exports.MAX_ERROR_RETRIES = exports.TEST_DATABASE_NAME = exports.TEMP_DIRECTORY_PATH = exports.DEBUG_DATABASE = exports.DATABASE_PASSWORD = exports.DATABASE_USER = exports.DATABASE_NAME = exports.DATABASE_HOST = exports.LOG_LEVEL = exports.NODE_ENV = void 0;
const env = __importStar(require("env-var"));
exports.NODE_ENV = env.get('NODE_ENV').default('development').asString();
exports.LOG_LEVEL = env.get('LOG_LEVEL').default('debug').asString();
exports.DATABASE_HOST = env.get('DATABASE_HOST').required().asString();
exports.DATABASE_NAME = env.get('DATABASE_NAME').required().asString();
exports.DATABASE_USER = env.get('DATABASE_USER').required().asString();
exports.DATABASE_PASSWORD = env
    .get('DATABASE_PASSWORD')
    .required()
    .asString();
exports.DEBUG_DATABASE = env
    .get('DEBUG_DATABASE')
    .default('false')
    .asBoolStrict();
exports.TEMP_DIRECTORY_PATH = env
    .get('TEMP_DIRECTORY_PATH')
    .default('/tmp')
    .asString();
exports.TEST_DATABASE_NAME = env
    .get('TEST_DATABASE_NAME')
    .default(`${process.env.DATABASE_NAME}_test`)
    .asString();
// TODO: Unused, consider to remove?
exports.MAX_ERROR_RETRIES = env
    .get('MAX_ERROR_RETRIES')
    .default(3)
    .asIntPositive();
exports.MAX_PRODUCT_IMAGE_SIZE = env
    .get('MAX_PRODUCT_IMAGE_SIZE')
    .default(1000)
    .asIntPositive();
exports.SUPERADMIN_USERNAME = env
    .get('SUPERADMIN_USERNAME')
    .default('')
    .asString();
exports.SUPERADMIN_PASSWORD = env
    .get('SUPERADMIN_PASSWORD')
    .default('')
    .asString();
//# sourceMappingURL=config.js.map