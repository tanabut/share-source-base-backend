import { DATABASE_NAME, TEST_DATABASE_NAME } from '../config';
import { dbConfig, initDb } from '../db';
import { logger } from '../logger';

export async function createDb() {
  const newConfig = { ...dbConfig };
  delete newConfig.database;

  const client = await initDb(newConfig);

  if (!client) {
    return;
  }

  await client.query(`CREATE DATABASE ${DATABASE_NAME}`);
  await client.query(`CREATE DATABASE ${TEST_DATABASE_NAME}`);

  logger.info(
    `Created databases : ${DATABASE_NAME} and ${TEST_DATABASE_NAME}`,
  );

  client.close();
}

createDb();
