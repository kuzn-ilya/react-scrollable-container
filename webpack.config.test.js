var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var common = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['', '.js', '.ts', '.tsx', '.less', '.html'],
        modulesDirectories: ['node_modules', 'sources']
    },

    // Externals are necessary for working enzyme.
    externals: {
        'cheerio': 'window',
        'react/addons': 'addons',
        'react/lib/ExecutionEnvironment': 'ExecutionEnvironment',
        'react/lib/ReactContext': 'ReactContext'
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
                test: /(\.less$)|(\.css$)/,
                loaders: ['style-loader', 'css-loader', 'less-loader'],
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

module.exports = common;
