var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');
var path = require('path');

var cssVars = require('../sources/stubs/cssVars.js');

var config = merge.smart(common, {
    devtool: 'inline-source-map',

    entry: {
        libs: [
            "react",
            "react-dom"
        ]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        sourceMap: false,
                        inlineSourceMap: true
                    }
                },
                exclude: ["node_modules"]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
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
            },
            {
                enforce: 'post',
                test: /\.tsx?$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    'node_modules',
                    'test'
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("test") 
            }
        })        
    ]
});

module.exports = config;