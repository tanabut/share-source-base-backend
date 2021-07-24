import { initDb, dbConfig } from '../db';
import { logger } from '../logger';

// TODO : Extract this to common workspace
function registerProcessEvents() {
  process.on('uncaughtException', (error: Error) => {
    logger.error('UncaughtException', error);
  });

  process.on('unhandledRejection', (reason: any, promise: any) => {
    logger.info(reason, promise);
  });

  process.on('SIGTERM', async () => {
    logger.info('Starting graceful shutdown');
  });
}

async function migrateDb() {
  const connection = await initDb({
    ...dbConfig,
    migrations: ['dist/__migrations/*.js'],
    cli: {
      migrationsDir: 'dist/__migrations',
    },
  });

  logger.info(`Running migrations on "${dbConfig.database}"`);

  await connection.runMigrations({});
  await connection.close();
}

registerProcessEvents();
migrateDb()
  .then(() => {
    process.exit();
  })
  .catch(err => {
    // TODO: logger.error for err object is not working
    logger.error(err);
    process.exit(1);
  });
