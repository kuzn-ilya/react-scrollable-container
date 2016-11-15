var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var common = {
    devtool: 'inline-source-map',

    /**
     * These parameters will be used for rendering `index.html`.
     */
    metadata: {
        title: 'React Container',
        baseUrl: '/'
    },

    resolve: {
        extensions: ['', '.js', '.ts', '.tsx', '.less', '.html'],
        modulesDirectories: ['node_modules', 'sources']
    },

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
            /**
             * Instruments TS source files for subsequent code coverage.
             * See https://github.com/deepsweet/istanbul-instrumenter-loader
             */
            {
                test: /\.tsx?$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    'node_modules',
                    'test'
                ]
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
        new HtmlWebpackPlugin({
            title: 'react-grid-viewport',
            template: './index.ejs',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ForkCheckerPlugin(),
        new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ })
    ]
};

module.exports = common;
