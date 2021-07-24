// require("dotenv").config();

import * as env from "env-var";

// TODO: Remove dependency env-var
// TODO: Edit others config to import these env from here instead
export const NODE_ENV = env.get("NODE_ENV").default("development").asString();
export const LOG_LEVEL = env.get("LOG_LEVEL").default("debug").asString();

export { env };
