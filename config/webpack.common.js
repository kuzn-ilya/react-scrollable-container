var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
    resolve: {
        extensions: ['', '.js', '.ts', '.tsx', '.css', '.less', '.html'],
        modulesDirectories: ['node_modules', 'sources']
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
                test: /(\.css$)/,
                loaders: [
                    'style-loader', 
                    'css-loader',
                    path.join(__dirname, 'cssLoader.js')
                ],
                exclude: ["node_modules"]
            }
        ]       
    }
};
