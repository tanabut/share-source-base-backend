// Load config as the first thing to do
// eslint-disable-next-line import/order
require('./config');

import { initApp } from './app';
import { PORT } from './config';
import { logger } from './logger';

async function startServer() {
  const { app } = await initApp();
  app.listen(PORT, () =>
    logger.debug(`Application listening on port: ${PORT}`),
  );
}

startServer();
