export default {
  preset: 'ts-jest',
  transform: {
    "^.+\\.tsx?$": "ts-jest" 
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|css)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
}