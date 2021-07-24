"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockDb = exports.mockData = void 0;
const user_mock_1 = require("../user/user.mock");
const db_1 = require("../db");
async function mockData() {
    const { manager } = db_1.getConnection();
    await user_mock_1.insertMockUsers(manager);
}
exports.mockData = mockData;
async function mockDb() {
    const client = await db_1.initDb();
    if (!client) {
        return;
    }
    await mockData();
    client.close();
}
exports.mockDb = mockDb;
if (module === require.main) {
    mockDb();
}
//# sourceMappingURL=mockDb.js.map