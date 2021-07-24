import { Connection } from "typeorm";

let connection: Connection;

export async function setupDatabase(dbConnection: Connection) {
  connection = dbConnection;

  if (!dbConnection) {
    throw new Error(
      "Cannot establish connection to test database. Please check config",
    );
  }

  await connection.synchronize(true);
}

export async function clearDatabase() {
  if (connection) {
    await connection.dropDatabase();
    await connection.close();
  }
}

export function getConnection() {
  return connection;
}
