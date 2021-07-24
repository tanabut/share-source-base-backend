import crypto from "crypto";

import Boom from "@hapi/boom";
import { APIError } from "@share-source-base/types";
import { Context } from "koa";
import morgan from "morgan";

import { NODE_ENV } from "./config";
import { logger } from "./logger";

// export { authentication } from "./auth/auth.middleware";

export function responseTime() {
  return async (ctx: Context, next: () => Promise<void>) => {
    const start = Date.now();

    await next();

    ctx.set("X-Response-Time", (Date.now() - start).toString());
  };
}

export function errorHandling() {
  return async (ctx: Context, next: () => Promise<void>) => {
    try {
      await next();
    } catch (err) {
      // Create an error hash
      const logHash = crypto
        .createHash("sha1")
        .update(`${Date.now()}`)
        .digest("hex");

      // Default Api error object
      const apiErr: APIError = {
        ref: logHash,
        message: "Internal server error.",
        statusCode: 500,
      };

      // All boom errors except internal server error
      if (Boom.isBoom(err) && !err?.isServer) {
        if (err.data) apiErr.data = err.data;
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

export function httpLogger() {
  const handler = morgan(NODE_ENV === "production" ? "combined" : "dev", {
    stream: {
      // TODO: Detect error?
      write: message => logger.info(message),
    },
  });

  return (ctx: Context, next: () => Promise<void>) =>
    new Promise((resolve, reject) => {
      handler(ctx.req, ctx.res, err => {
        if (err) {
          reject(err);
        } else {
          resolve(ctx);
        }
      });
    }).then(next);
}
