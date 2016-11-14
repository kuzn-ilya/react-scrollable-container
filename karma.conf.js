var webpackConfig = require('./webpack.config.test');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/*.spec.tsx'
    ],
    exclude: [
      'node_modules'
    ],
    preprocessors: {
      'sources/**/*.tsx': ['webpack', 'coverage', 'sourcemap'],
      'sources/**/*.ts': ['webpack', 'coverage', 'sourcemap'],
      'test/**/*.spec.tsx': ['webpack']
    },
    webpack: webpackConfig,
    webpackServer: { noInfo: true },
    reporters: [
      'progress',
      'dots',
      'spec',
      'mocha',
      'coverage'
    ],
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}