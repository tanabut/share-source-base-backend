import "@share-source-base/core/dist/config";

import * as env from "env-var";

export const NODE_ENV = env.get("NODE_ENV").default("development").asString();
export const PORT = env.get("PORT").default(3001).asPortNumber();

export const CLIENT_HOST = env
  .get("CLIENT_HOST")
  .default("localhost:3000")
  .asString();

export const JWT_SECRET = env.get("JWT_SECRET").default("jwtsecret").asString();

const DAY_IN_SECONDS = 24 * 60 * 60;
export const ACCESS_TOKEN_LIFETIME = 2 * DAY_IN_SECONDS;

export const ELASTICSEARCH_HOST = env
  .get("ELASTICSEARCH_HOST")
  .default("http://localhost:9200")
  .asString();
export const ELASTICSEARCH_USERNAME = env
  .get("ELASTICSEARCH_USERNAME")
  .asString();
export const ELASTICSEARCH_PASSWORD = env
  .get("ELASTICSEARCH_PASSWORD")
  .asString();

export const DEFAULT_PER_PAGE = 20;
