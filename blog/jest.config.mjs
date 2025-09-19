export default {
  testEnvironment: "node",
  transform: {},
  testMatch: ["**/__tests__/**/*.mjs", "**/?(*.)+(spec|test).mjs"],
  setupFiles: ["<rootDir>/jest.setup.mjs"],
};
