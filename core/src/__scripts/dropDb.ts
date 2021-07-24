import { DATABASE_NAME, TEST_DATABASE_NAME, NODE_ENV } from '../config';
import { dbConfig, initDb } from '../db';
import { logger } from '../logger';

export async function dropDb() {
  if (NODE_ENV === 'production') {
    throw new Error('Cannot drop database with NODE_ENV=production');
  }

  const newConfig = { ...dbConfig };
  delete newConfig.database;

  const client = await initDb(newConfig);

  if (!client) {
    return;
  }

  try {
    await client.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    await client.query(`DROP DATABASE IF EXISTS ${TEST_DATABASE_NAME}`);

    logger.debug(
      `Dropped databases : ${DATABASE_NAME} and ${TEST_DATABASE_NAME}`,
    );

    client.close();
  } catch (err) {
    client.close();

    throw err;
  }
}

dropDb();
