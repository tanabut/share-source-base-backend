import 'reflect-metadata';
import {
  createConnection,
  ConnectionOptions,
  getConnection as _getConnection,
} from 'typeorm';

import {
  NODE_ENV,
  DATABASE_HOST,
  TEST_DATABASE_NAME,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DEBUG_DATABASE,
} from './config';
import entities from './entities/collection';
import { logger } from './logger';

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: 5432,
  database: NODE_ENV === 'test' ? TEST_DATABASE_NAME : DATABASE_NAME,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  entities,
  synchronize: false,
  logging: DEBUG_DATABASE ? 'all' : ['error'],
};

export async function initDb(customConfig?: ConnectionOptions) {
  const connection = await createConnection(customConfig || dbConfig);

  if (connection.options.database) {
    logger.debug(`Connected to database: "${connection.options.database}"`);
  }

  return connection;
}

export const getConnection = _getConnection;

export const getManager = async () => {
  const connection = getConnection();
  return connection.manager;
};
