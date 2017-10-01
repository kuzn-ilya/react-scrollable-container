var webpack = require('webpack');
var path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.css', '.less', '.html'],
        modules: ['node_modules', 'sources']
    },

    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader'
                ]
            }        
        ]       
    }
};
