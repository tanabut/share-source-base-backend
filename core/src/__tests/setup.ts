import { initDb } from '../db';
import { setupDatabase, clearDatabase } from './dbHelpers';

beforeAll(async () => {
  const dbConnection = await initDb();
  await setupDatabase(dbConnection);
});

afterAll(async () => {
  await clearDatabase();
});
