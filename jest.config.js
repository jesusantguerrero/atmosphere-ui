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
      '^.+\\.ts$': 'ts-jest',
      '^.+\\.js$': 'babel-jest',
      '^.+\\.vue$': '@vue/vue3-jest'
    }
  }