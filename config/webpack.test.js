var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['', '.js', '.ts', '.tsx', '.css', '.less', '.html'],
        modulesDirectories: ['node_modules', 'sources']
    },

    output: {
        library: 'ReactScrollable',
        libraryTarget: 'umd',
        path: 'dist',
        filename: '[name].js',
    },

    // Externals are necessary for working karma.
    externals: {
        'react/addons': 'addons',
        'react/lib/ExecutionEnvironment': 'ExecutionEnvironment',
        'react/lib/ReactContext': 'ReactContext',
    },    

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    'awesome-typescript-loader?' + JSON.stringify({
                        sourceMap: false,
                        inlineSourceMap: true
                    })
                ],
                exclude: ["node_modules"]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.ejs?$/,
                loaders: ['ejs-loader'],
                include: path.resolve(__dirname, "client")
            },
            {
                test: /(\.css$)/,
                loaders: [
                    'style-loader', 
                    'css-loader',
                    path.join(__dirname, 'cssLoader.js')
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
    }
};
