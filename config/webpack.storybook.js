var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var cssVars = require('../sources/stubs/cssVars.js');

var config = merge.smart(common, 
{
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        hot: true,
        port: 8081
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'react-hot-loader/webpack',
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            forkChecker: true
                        }
                    }
                ],
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            localIdentName: '[local]'
                        }
                    }, {
                        loader: path.join(__dirname, 'cssLoader.js'),
                        options: cssVars.CSS_ALL_VARS
                    }
                ],
                exclude: ["node_modules"]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ }),
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("development") 
            }
        })        
    ]
});

module.exports = config;