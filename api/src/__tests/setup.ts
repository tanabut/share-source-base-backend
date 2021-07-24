import { insertMockAddresses } from "@share-source-base/core/dist/address/address.mock";
import { initDb } from "@share-source-base/core/dist/db";
import { insertMockPaymentMethods } from "@share-source-base/core/dist/payment/payment-method.mock";

import { setupDatabase, clearDatabase } from "./dbHelpers";

beforeAll(async () => {
  const dbConnection = await initDb();
  await setupDatabase(dbConnection);

  await insertMockPaymentMethods(dbConnection.manager);
  await insertMockAddresses(dbConnection.manager);
});

afterAll(async () => {
  await clearDatabase();
});
