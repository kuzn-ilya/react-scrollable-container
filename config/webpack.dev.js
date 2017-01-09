var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var cssVars1 = require('../sources/stubs/cssVars.js');
var cssVars2 = require('../examples/page/cssVars.js');

var cssVars = merge(cssVars1, cssVars2);

var reactMinConfig = {
    module: {
        loaders: [
            {
                test: /react-dom\.min\.js$/,
                loader: 'imports?React=react'
            }        
        ],
        noParse: [
            path.join(__dirname, '..', 'node_modules', 'react', 'dist', 'react.min.js'),
            path.join(__dirname, '..', 'node_modules', 'react-dom', 'dist', 'react-dom.min.js')
        ]        
    },
    resolve: {
        alias: {
            'react$': path.join(__dirname, '..', 'node_modules', 'react', 'dist', 'react.min.js'),
            'react-dom$': path.join(__dirname, '..', 'node_modules', 'react-dom', 'dist', 'react-dom.min.js')
        }
    }
};

var config = merge.smart(common, 
    // Uncomment the next line for react.min.js and react-dom.min.js usage
    // reactMinConfig,
{
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        hot: true,
        port: 8081
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
            },
            {
                test: require.resolve('react'),
                loader: 'expose-loader?React'
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
        new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ }),
        new HtmlWebpackPlugin({
            title: 'react-container',
            template: './index.ejs',
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "libs",
            minChunks: 0
        }),
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("development") 
            }
        })        
    ]
});

module.exports = config;