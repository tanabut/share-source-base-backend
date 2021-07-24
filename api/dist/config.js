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
exports.DEFAULT_PER_PAGE = exports.ELASTICSEARCH_PASSWORD = exports.ELASTICSEARCH_USERNAME = exports.ELASTICSEARCH_HOST = exports.ACCESS_TOKEN_LIFETIME = exports.JWT_SECRET = exports.CLIENT_HOST = exports.PORT = exports.NODE_ENV = void 0;
require("@share-source-base/core/dist/config");
const env = __importStar(require("env-var"));
exports.NODE_ENV = env.get("NODE_ENV").default("development").asString();
exports.PORT = env.get("PORT").default(3001).asPortNumber();
exports.CLIENT_HOST = env
    .get("CLIENT_HOST")
    .default("localhost:3000")
    .asString();
exports.JWT_SECRET = env.get("JWT_SECRET").default("jwtsecret").asString();
const DAY_IN_SECONDS = 24 * 60 * 60;
exports.ACCESS_TOKEN_LIFETIME = 2 * DAY_IN_SECONDS;
exports.ELASTICSEARCH_HOST = env
    .get("ELASTICSEARCH_HOST")
    .default("http://localhost:9200")
    .asString();
exports.ELASTICSEARCH_USERNAME = env
    .get("ELASTICSEARCH_USERNAME")
    .asString();
exports.ELASTICSEARCH_PASSWORD = env
    .get("ELASTICSEARCH_PASSWORD")
    .asString();
exports.DEFAULT_PER_PAGE = 20;
//# sourceMappingURL=config.js.map