module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    rootDir: 'backend', 
    testRegex: '.*\\.spec\\.ts$', 
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    coverageDirectory: './coverage',
  };
  