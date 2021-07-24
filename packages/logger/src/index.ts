import path from "path";

import { LoggingWinston } from "@google-cloud/logging-winston";
import { LOG_LEVEL, NODE_ENV } from "@share-source-base/env";
import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

function createLogger({ name }: { name: string }) {
  return winston.createLogger({
    level: LOG_LEVEL,
    format: format.combine(format.timestamp(), format.json()),
    defaultMeta: { service: "backend" },
    transports:
      NODE_ENV === "production"
        ? [
            new winston.transports.Console({ format: format.json() }),
            new LoggingWinston(),
          ]
        : [
            new winston.transports.Console({
              format: format.combine(format.colorize(), format.simple()),
            }),
            new DailyRotateFile({
              dirname: path.resolve(__dirname, "../logs"),
              filename: `${name}-%DATE%.log`,
              datePattern: "YYYY-MM-DD",
            }),
          ],
  });
}

export const logger = createLogger({
  name: "app",
});
