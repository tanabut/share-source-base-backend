import * as env from 'env-var';

export const NODE_ENV = env.get('NODE_ENV').default('development').asString();
export const LOG_LEVEL = env.get('LOG_LEVEL').default('debug').asString();

export const DATABASE_HOST = env.get('DATABASE_HOST').required().asString();
export const DATABASE_NAME = env.get('DATABASE_NAME').required().asString();
export const DATABASE_USER = env.get('DATABASE_USER').required().asString();
export const DATABASE_PASSWORD = env
  .get('DATABASE_PASSWORD')
  .required()
  .asString();
export const DEBUG_DATABASE = env
  .get('DEBUG_DATABASE')
  .default('false')
  .asBoolStrict();

export const TEMP_DIRECTORY_PATH = env
  .get('TEMP_DIRECTORY_PATH')
  .default('/tmp')
  .asString();

export const TEST_DATABASE_NAME = env
  .get('TEST_DATABASE_NAME')
  .default(`${process.env.DATABASE_NAME}_test`)
  .asString();

// TODO: Unused, consider to remove?
export const MAX_ERROR_RETRIES = env
  .get('MAX_ERROR_RETRIES')
  .default(3)
  .asIntPositive();
export const MAX_PRODUCT_IMAGE_SIZE = env
  .get('MAX_PRODUCT_IMAGE_SIZE')
  .default(1000)
  .asIntPositive();

export const SUPERADMIN_USERNAME = env
  .get('SUPERADMIN_USERNAME')
  .default('')
  .asString();
export const SUPERADMIN_PASSWORD = env
  .get('SUPERADMIN_PASSWORD')
  .default('')
  .asString();
