var webpackConfig = require('./webpack.config.test');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/*.spec.ts',
      'test/*.spec.tsx'
    ],
    exclude: [
      'node_modules'
    ],
    preprocessors: {
      'test/**/*.spec.tsx': ['webpack'],
      'test/**/*.spec.ts': ['webpack']
    },
    webpack: webpackConfig,
    webpackServer: { noInfo: true },
    reporters: [
      'progress',
      'dots',
      'spec',
      'mocha'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}