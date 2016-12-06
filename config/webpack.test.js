var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');
var path = require('path');

var cssVars = require('../sources/stubs/cssVars.js');

var config = merge.smart(common, {
    devtool: 'inline-source-map',

    // Externals are necessary for working karma.
    externals: {
        'react/addons': 'addons',
        'react/lib/ExecutionEnvironment': 'ExecutionEnvironment',
        'react/lib/ReactContext': 'ReactContext',
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader', 
                    'css-loader',
                    path.join(__dirname, 'cssLoader.js?') + JSON.stringify(cssVars.CSS_VARS)
                ],
                exclude: ["node_modules"]
            }
        ],
        postLoaders: [
            {
                test: /\.tsx?$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    'node_modules',
                    'test'
                ]
            }
        ]
    },

    // This section is here to avoid webpack errors while loading useragent lib.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }    
});

module.exports = config;