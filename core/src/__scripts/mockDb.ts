
import { insertMockUsers } from '../user/user.mock';
import { getConnection, initDb } from '../db';

export async function mockData(): Promise<void> {
  const { manager } = getConnection();

  await insertMockUsers(manager);
}

export async function mockDb(): Promise<void> {
  const client = await initDb();

  if (!client) {
    return;
  }

  await mockData();

  client.close();
}

if (module === require.main) {
  mockDb();
}
