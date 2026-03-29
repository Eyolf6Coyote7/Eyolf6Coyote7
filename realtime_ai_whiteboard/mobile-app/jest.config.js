module.exports = {
  testEnvironment: "node",
  globals: { __DEV__: true },
  transform: {
    "^.+\\.tsx?$": [
      "babel-jest",
      { presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-typescript"] },
    ],
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!src/__tests__/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "json-summary"],
};
