"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const typeorm_1 = require("typeorm");
/* eslint-disable @typescript-eslint/no-explicit-any */
function isBoom(error) {
    return error.isBoom;
}
function getErrorDetails(error) {
    let status = error.status || 500;
    let body = {
        message: error.message,
    };
    if (isBoom(error)) {
        status = error.output.statusCode;
        body = {
            ...error.output.payload,
            ...error.data,
        };
    }
    else if (error.constructor.name === typeorm_1.QueryFailedError.name) {
        // Unique constraint error
        // Default msg: duplicate key value violates unique constraint "UQ_5e568e001f9d1b91f67815c580f
        // New: Key (<column>)=(<value>) already exists.
        // @ts-ignore
        if (error.code === '23505') {
            body = {
                // @ts-ignore
                message: error.detail,
            };
        }
    }
    return { status, body };
}
const errorMiddleware = async (ctx, next) => {
    try {
        await next();
    }
    catch (error) {
        // TODO : Figure out a way to display stacktrace using logger
        // logger.error(error);
        const { status, body } = getErrorDetails(error);
        ctx.status = status;
        ctx.body = body;
    }
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error-handler.js.map