var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var cssVars1 = require('../sources/stubs/cssVars.js');
var cssVars2 = require('../examples/page/cssVars.js');

var cssVars = merge(cssVars1, cssVars2);

var config = merge.smart(common, {
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        hot: true
    },
    context: path.join(__dirname, '../examples/page'),
    entry: {
        app: "./app.tsx",
        libs: [
            "react",
            "react-dom"
        ]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "react-hot-loader/webpack!awesome-typescript-loader?" + JSON.stringify({
                    forkChecker: true
                }),
                exclude: ["node_modules"]
            },
            {
                test: /\.ejs?$/,
                loaders: ['ejs-loader']
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
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].js",
        publicPath: "/",
        sourceMapFilename: '[name].js.map',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ }),
        new HtmlWebpackPlugin({
            title: 'react-container',
            template: './index.ejs',
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "libs",
            minChunks: 0
        })
    ]
});

module.exports = config;