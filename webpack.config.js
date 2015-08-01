var webpack = require('webpack');
var path = require('path');


module.exports = {
    context: path.join(__dirname, 'src'),

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app.js',
    ],

    output: {
        path: path.join(__dirname, 'build'),

        filename: 'app.js'
    },

    devtool: 'eval',

    preLoaders: [
        {
            test: /\.js$/,
            include: [__dirname + '/src'],
            loader: 'source-map-loader'
        }
    ],

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
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
            }
        ]
    }
};
