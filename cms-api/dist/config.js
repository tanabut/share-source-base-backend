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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.PORT = exports.NODE_ENV = exports.CORE_STATIC_DIR = exports.CMS_FRONTEND_BUILD_DIR = void 0;
require("@share-source-base/data-etl/dist/config");
require("@share-source-base/core/dist/config");
const path_1 = __importDefault(require("path"));
const env = __importStar(require("env-var"));
exports.CMS_FRONTEND_BUILD_DIR = path_1.default.resolve(__dirname, '../../cms-client/build');
exports.CORE_STATIC_DIR = path_1.default.resolve(__dirname, '../../core/static');
exports.NODE_ENV = env.get('NODE_ENV').default('development').asString();
exports.PORT = env.get('PORT').default(4001).asPortNumber();
exports.JWT_SECRET = env.get('JWT_SECRET').default('jwtsecret').asString();
//# sourceMappingURL=config.js.map