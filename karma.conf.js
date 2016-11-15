var webpackConfig = require('./webpack.config.test');

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai', 'source-map-support'],

    files: [
      './app.tsx'
    ],

    exclude: [
      'node_modules'
    ],
    
    preprocessors: {
      './app.tsx': ['webpack'],
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
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}