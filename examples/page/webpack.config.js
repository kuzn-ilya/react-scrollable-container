var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        hot: true
    },
    context: __dirname,
    entry: {
        app: "./app.tsx",
        libs: [
            "react",
            "react-dom"
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.tsx', '.less', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ["react-hot-loader/webpack", 'awesome-typescript-loader?forkChecker=true'],
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
                    path.join(__dirname, './../../config/cssLoader.js')
                ],
                exclude: ["node_modules"]
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader'],
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
        new ForkCheckerPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "libs",
            minChunks: 0
        })
    ]
};
