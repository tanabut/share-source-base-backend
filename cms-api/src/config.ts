import '@share-source-base/data-etl/dist/config';
import '@share-source-base/core/dist/config';

import path from 'path';

import * as env from 'env-var';

export const CMS_FRONTEND_BUILD_DIR = path.resolve(
  __dirname,
  '../../cms-client/build',
);
export const CORE_STATIC_DIR = path.resolve(__dirname, '../../core/static');

export const NODE_ENV = env.get('NODE_ENV').default('development').asString();
export const PORT = env.get('PORT').default(4001).asPortNumber();
export const JWT_SECRET = env.get('JWT_SECRET').default('jwtsecret').asString();
