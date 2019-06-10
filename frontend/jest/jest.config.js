module.exports = {
  rootDir: '../',
  roots: ['<rootDir>/tests'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],

  moduleDirectories: ['node_modules'],

  snapshotSerializers: ['enzyme-to-json/serializer'],

  setupFiles: ['<rootDir>/jest/enzyme.config.js'],

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.((t|j)sx?)$',
};
