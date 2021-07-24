const { buildConfigWithTsJest } = require("../../jest.config.base");

module.exports = buildConfigWithTsJest(__dirname, {
  setupFilesAfterEnv: ["./src/__tests/setup.ts"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "<rootDir>/.*\\.system\\.test\\.ts$",
  ],
});
