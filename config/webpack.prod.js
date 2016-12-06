var common = require('./webpack.common.js');
var merge = require('webpack-merge');
var glob = require('glob');
var path = require('path');
var cssVars = require('../sources/stubs/cssVars.js');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = merge.smart(common, {
    output: {
        library: 'ReactScrollable',
        libraryTarget: 'umd',
        path: 'build',
        filename: '[name].js',
    },

    entry: {
        components: './sources/container/index.ts'
    },

    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom'
        },
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!' + path.join(__dirname, 'cssLoader.js?') + JSON.stringify(cssVars.CSS_VARS)
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]    
});

module.exports = config;