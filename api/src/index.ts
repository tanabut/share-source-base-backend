// Load config as the first thing to do
// eslint-disable-next-line import/order
require("./config");

import { Server } from "http";

import { initDb } from "@share-source-base/core/dist/db";
import { Connection } from "typeorm";

import { createApp } from "./app";
import { PORT } from "./config";
import { logger } from "./logger";

function registerProcessEvents(server: Server, dbConnection: Connection) {
  process.on("uncaughtException", (error: Error) => {
    logger.error("UncaughtException", error);
  });

  process.on("unhandledRejection", (reason: any, promise: any) => {
    logger.info(reason, promise);
  });

  process.on("SIGTERM", async () => {
    logger.info("Starting graceful shutdown");

    server.close(async err => {
      const errors = [];
      let exitCode = 0;

      if (err) {
        errors.push(err);
      }

      try {
        await dbConnection.close();
      } catch (e) {
        errors.push(e);
      }

      if (errors.length > 1) {
        logger.error("Error in graceful shutdown ", ...errors);
        exitCode = 1;
      }

      process.exit(exitCode);
    });
  });
}

async function startServer() {
  try {
    logger.info("Starting API server");

    const dbConnection = await initDb();

    const app = createApp();

    const server = app.listen(PORT, () => {
      logger.info(`Application running on port: ${PORT}`);
    });

    registerProcessEvents(server, dbConnection);
  } catch (e) {
    logger.error(e, "An error occurred while initializing application.");
  }
}

startServer();
