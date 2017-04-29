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

    client: {
      mocha: {
        timeout: 20000
      }
    },
    
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

    customLaunchers: {
      PhantomJSCustom: {
          base: 'PhantomJS',
          options: {
              onCallback: function(data) {
                  if (data.type === 'sendEvent') {
                      page.sendEvent(data.event, data.key);
                  }
              }
          }
      },
      ChromeDebug: {
          base: 'Chrome',
          flags: ['--remote-debugging-port=9222'],
          debug: true
      }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJSCustom'],
    singleRun: true,
    concurrency: Infinity
  })
}