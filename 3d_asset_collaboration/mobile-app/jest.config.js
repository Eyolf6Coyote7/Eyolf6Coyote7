module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@reduxjs/toolkit|react-redux)",
  ],
  setupFilesAfterSetup: ["./src/test-setup.js"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!app/**/*",
    "!**/*.d.ts",
    "!src/__tests__/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "json-summary"],
};
