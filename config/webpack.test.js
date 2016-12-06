var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');
var path = require('path');

module.exports = merge(common, {
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
    }
});
