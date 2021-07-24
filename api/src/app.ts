import cors from "@koa/cors";
import Koa from "koa";
import helmet from "koa-helmet";
import koaJoiRouter from "koa-joi-router";

import { NODE_ENV } from "./config";
import { logger } from "./logger";
import * as middlewares from "./middlewares";
import routes from "./routes";

export function createApp(): Koa {
  const app = new Koa();

  app.use(middlewares.httpLogger());
  app.use(helmet());

  // TODO: Extract to somewhere else
  const healthRouter = koaJoiRouter();

  healthRouter.route({
    method: "get",
    path: "/healthz",
    validate: {
      query: {},
    },
    handler: async ctx => {
      ctx.status = 200;
    },
  });

  app.use(healthRouter.middleware());

  if (NODE_ENV === "production") {
    app.use(cors());
  }

  app.use(middlewares.responseTime());
  app.use(middlewares.errorHandling());
  // TODO: error handling middleware
  // TODO: log request middleware

  app.use(routes.middleware());

  app.on("error", error => {
    const { logHash, err } = error;
    logger.error(`Error Handler (${logHash}) :`, err);
  });

  return app;
}
