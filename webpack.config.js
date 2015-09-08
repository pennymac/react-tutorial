var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app.js',
    ],

    output: {
        /**
         * The output directory
         */
        path: path.join(__dirname, 'build'),

        filename: 'app.js'
    },

    devtool: 'eval',

    preLoaders: [
        {
            test: /\.js$/,
            include: [path.join(__dirname, 'scripts')],
            loader: 'source-map-loader'
        }
    ],

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('styles.css')
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,

                include: [
                    path.join(__dirname, 'src')
                ],

                loaders: [
                    'react-hot',
                    'jsx',
                    'babel'
                ]
            },
            {
                test: /\.css$/,

                include: [
                    path.join(__dirname, 'src')
                ],

                // loaders: ['style', 'css']
		loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    }
};
