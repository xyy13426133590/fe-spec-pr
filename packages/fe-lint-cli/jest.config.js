module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.js'],
  moduleNameMapper: {
    '^markdownlint$': '<rootDir>/test/__mocks__/markdownlint.js',
    '^markdownlint/sync$': '<rootDir>/test/__mocks__/markdownlint-sync.js',
    '^markdownlint/promise$': '<rootDir>/test/__mocks__/markdownlint-promise.js',
    '^stylelint$': '<rootDir>/test/__mocks__/stylelint.js',
  },
};
