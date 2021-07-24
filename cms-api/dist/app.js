"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const cors_1 = __importDefault(require("@koa/cors"));
const cls_1 = require("@share-source-base/core/dist/cls");
const db_1 = require("@share-source-base/core/dist/db");
const koa_1 = __importDefault(require("koa"));
const koa_static_1 = __importDefault(require("koa-static"));
const config_1 = require("./config");
const error_handler_1 = require("./error/error-handler");
const routes_1 = __importDefault(require("./routes"));
async function initApp() {
    const app = new koa_1.default();
    const dbConnection = await db_1.initDb();
    app.use(cors_1.default());
    app.use(cls_1.CmsApiCLS.koaMiddleware());
    app.use(error_handler_1.errorMiddleware);
    app.use(routes_1.default.middleware());
    if (config_1.NODE_ENV === 'production') {
        const serveFrontendMiddleware = koa_static_1.default(config_1.CMS_FRONTEND_BUILD_DIR);
        app.use(serveFrontendMiddleware);
        app.use(async (ctx, next) => {
            return serveFrontendMiddleware(Object.assign(ctx, { path: 'index.html' }), next);
        });
    }
    app.use(koa_static_1.default(config_1.CORE_STATIC_DIR));
    return { app, dbConnection };
}
exports.initApp = initApp;
//# sourceMappingURL=app.js.map