const fs = require("fs");
const path = require("path");

const tsConfig = "tsconfig.json";

function buildConfig(packageDirectory, pkgConfig) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const packageName = require(`${packageDirectory}/package.json`).name;

  return {
    ...pkgConfig,
    displayName: packageName,
    coverageDirectory: "<rootDir>/coverage/",
    coverageReporters: ["lcov", "text"],
    collectCoverageFrom: [
      "<rootDir>/src/**/*.{js,ts,tsx}",
      "!**/node_modules/**",
    ],
  };
}

function buildConfigWithTsJest(packageDirectory, pkgConfig) {
  const packageTsconfig = path.resolve(packageDirectory, tsConfig);

  return buildConfig(packageDirectory, {
    preset: "ts-jest",
    testEnvironment: "node",
    globals: {
      "ts-jest": {
        diagnostics: { warnOnly: true },
        tsconfig: fs.existsSync(packageTsconfig)
          ? packageTsconfig
          : path.resolve(__dirname, tsConfig),
      },
    },
    ...pkgConfig,
  });
}

module.exports = {
  buildConfig,
  buildConfigWithTsJest,
};
