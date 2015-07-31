var webpack = require('webpack');

var providePlugin = new webpack.ProvidePlugin({
    React: 'react'
});

module.exports = {
    context: './build',

    entry: './app.js',

    output: {
        path: __dirname + '/build',

        filename: 'app.js'
    },

    devtool: 'eval-source-map',

    preLoaders: [
        {
            test: /\.js$/,
            include: [__dirname + '/src'],
            loader: 'source-map-loader'
        }
    ],

    // plugins: [
    //     providePlugin
    // ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [__dirname + '/src'],
                loader: 'react-hot'
                // loaders: ['react-hot', 'babel-loader'] // We might need this instead?
            }
        ]
    }
};
