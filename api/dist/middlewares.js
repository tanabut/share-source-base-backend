"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = exports.errorHandling = exports.responseTime = void 0;
const crypto_1 = __importDefault(require("crypto"));
const boom_1 = __importDefault(require("@hapi/boom"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const logger_1 = require("./logger");
// export { authentication } from "./auth/auth.middleware";
function responseTime() {
    return async (ctx, next) => {
        const start = Date.now();
        await next();
        ctx.set("X-Response-Time", (Date.now() - start).toString());
    };
}
exports.responseTime = responseTime;
function errorHandling() {
    return async (ctx, next) => {
        try {
            await next();
        }
        catch (err) {
            // Create an error hash
            const logHash = crypto_1.default
                .createHash("sha1")
                .update(`${Date.now()}`)
                .digest("hex");
            // Default Api error object
            const apiErr = {
                ref: logHash,
                message: "Internal server error.",
                statusCode: 500,
            };
            // All boom errors except internal server error
            if (boom_1.default.isBoom(err) && !err?.isServer) {
                if (err.data)
                    apiErr.data = err.data;
                apiErr.statusCode = err.output.payload.statusCode;
                apiErr.message = err?.output?.payload?.message;
            }
            // update request body and status code with apiErr
            ctx.body = apiErr;
            ctx.status = apiErr.statusCode;
            // Log the captured error
            ctx.app.emit("error", { logHash, err }, ctx);
        }
    };
}
exports.errorHandling = errorHandling;
function httpLogger() {
    const handler = morgan_1.default(config_1.NODE_ENV === "production" ? "combined" : "dev", {
        stream: {
            // TODO: Detect error?
            write: message => logger_1.logger.info(message),
        },
    });
    return (ctx, next) => new Promise((resolve, reject) => {
        handler(ctx.req, ctx.res, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(ctx);
            }
        });
    }).then(next);
}
exports.httpLogger = httpLogger;
//# sourceMappingURL=middlewares.js.map