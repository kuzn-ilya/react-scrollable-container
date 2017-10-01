var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var cssVars1 = require('../sources/stubs/cssVars.js');
var cssVars2 = require('../examples/page/cssVars.js');

var cssVars = merge(cssVars1, cssVars2);

var config = merge.smart(common, 
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
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "react-hot-loader/webpack!awesome-typescript-loader?" + JSON.stringify({
                    forkChecker: true
                }),
                exclude: [/node_modules/]
            },
            {
                test: /\.ejs?$/,
                loaders: ['ejs-loader']
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader', 
                    'css-loader?modules=true&camelCase=true&localIdentName=[local]',
                    path.join(__dirname, 'cssLoader.js?') + JSON.stringify(cssVars.CSS_ALL_VARS)
                ],
                exclude: ["node_modules"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ }),
        new HtmlWebpackPlugin({
            title: 'react-container',
            template: './index.ejs',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("development") 
            }
        })        
    ]
});

module.exports = config;