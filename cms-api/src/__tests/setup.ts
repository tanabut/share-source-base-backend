import { setupDatabase, clearDatabase } from '@share-source-base/core/src/__tests/dbHelpers';

import { initApp } from '../app';

import { setupApp, closeApp } from './appHelpers';

beforeAll(async () => {
  const { app, dbConnection } = await initApp();

  await setupApp(app);
  await setupDatabase(dbConnection);
});
afterAll(async () => {
  await closeApp();
  await clearDatabase();
});
