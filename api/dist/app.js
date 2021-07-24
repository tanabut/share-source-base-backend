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
exports.createApp = void 0;
const cors_1 = __importDefault(require("@koa/cors"));
const koa_1 = __importDefault(require("koa"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
const config_1 = require("./config");
const logger_1 = require("./logger");
const middlewares = __importStar(require("./middlewares"));
const routes_1 = __importDefault(require("./routes"));
function createApp() {
    const app = new koa_1.default();
    app.use(middlewares.httpLogger());
    app.use(koa_helmet_1.default());
    // TODO: Extract to somewhere else
    const healthRouter = koa_joi_router_1.default();
    healthRouter.route({
        method: "get",
        path: "/healthz",
        validate: {
            query: {},
        },
        handler: async (ctx) => {
            ctx.status = 200;
        },
    });
    app.use(healthRouter.middleware());
    if (config_1.NODE_ENV === "production") {
        app.use(cors_1.default());
    }
    app.use(middlewares.responseTime());
    app.use(middlewares.errorHandling());
    // TODO: error handling middleware
    // TODO: log request middleware
    app.use(routes_1.default.middleware());
    app.on("error", error => {
        const { logHash, err } = error;
        logger_1.logger.error(`Error Handler (${logHash}) :`, err);
    });
    return app;
}
exports.createApp = createApp;
//# sourceMappingURL=app.js.map