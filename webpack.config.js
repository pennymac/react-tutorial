var webpack = require('webpack');
var path = require('path');


module.exports = {
    context: path.join(__dirname, 'scripts'),

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
                    path.join(__dirname, 'scripts')
                ],

                loaders: [
                    'react-hot',
                    'jsx',
                    'babel'
                ]
            },
            {
                test: /\.sass$/,

                loader: 'style!css!sass?indentedSyntax'
            }
        ]
    }
};
