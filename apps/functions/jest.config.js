/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // Handle module aliases
    '^@tadeas/firestore-converters$': '<rootDir>/../../packages/firestore-converters/src/index.ts',
    '^@tadeas/types$': '<rootDir>/../../packages/types$/src/index.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
