var webpackConfig = require('./webpack.test');

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai', 'source-map-support'],

    files: [
      './test/**/*.spec.ts',
      './test/**/*.spec.tsx'
    ],

    exclude: [
      'node_modules'
    ],
    
    preprocessors: {
      './test/**/*.spec.ts': ['webpack'],
      './test/**/*.spec.tsx': ['webpack']
    },

    webpack: webpackConfig,

    webpackServer: { noInfo: true },
    reporters: [
      'mocha',
      'coverage'
    ],
    
    coverageReporter: {
        dir: 'coverage',
        reporters: [
            {
                type: 'json',
                subdir: '.',
                file: 'coverage.json'
            }
        ]
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS', 'Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}