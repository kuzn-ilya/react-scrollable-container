var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var common = {
    context: __dirname,
    entry: {
        app: "./app.tsx",
        libs: [
            "react",
            "react-dom"
        ]
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.js', '.ts', '.tsx']
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
                loaders: ['ejs-loader'],
                include: path.resolve(__dirname, "client")
            },
            {
                test: /(\.less$)|(\.css$)/,
                loader: 'style!css!less',
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
        new HtmlWebpackPlugin({
            title: 'react-grid-viewport',
            template: './index.ejs',
            inject: 'body'
        }),
        new ForkCheckerPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "libs",
            minChunks: 0
        }),
    ].concat(sourceMapPlugins),

};

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    module.exports = merge(common, {
        devServer: {
            inline: true,
            hot: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            }),
            new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ })
        ],
        devtool: 'eval-source-map'
    });
}

if (process.env.NODE_ENV === 'production') {
    module.exports = merge(common, {
        devtool: 'cheap-module-source-map',
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                    loadFakeData: JSON.stringify(loadFakeData),
                    standAlone: JSON.stringify(standAlone),
                }
            }),
            new webpack.optimize.OccurrenceOrderPlugin(true),
            new webpack.optimize.DedupePlugin(),
        ]
    })
}