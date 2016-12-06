var common = require('./webpack.common.js');
var merge = require('webpack-merge');

var config = merge.smart(common, {
    output: {
        library: 'ReactScrollable',
        libraryTarget: 'umd',
        path: 'dist',
        filename: '[name].js',
    },

    module: {
        loaders: [
            {
                test: /\.ejs?$/,
                loaders: ['ejs-loader'],
                include: path.resolve(__dirname, "client")
            }
        ]
    }
});

module.exports = config;