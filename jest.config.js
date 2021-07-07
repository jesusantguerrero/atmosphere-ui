// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: [
      'js',
      'json',
      'vue',
      'ts',
      'tsx',
      'jsx',
      'node'
    ],
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.vue$': 'vue-jest'
    }
  }