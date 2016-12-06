var common = require('./webpack.common.js');
var merge = require('webpack-merge');
var glob = require('glob');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = merge.smart(common, {
    output: {
        library: 'ReactScrollable',
        libraryTarget: 'umd',
        path: 'dist',
        filename: '[name].js',
    },

    entry: {
        components: glob.sync('./sources/**/*.{ts?,css}')
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
                    'css-loader!' + path.join(__dirname, 'cssLoader.js')
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]    
});

module.exports = config;