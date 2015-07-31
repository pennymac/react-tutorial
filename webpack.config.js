var webpack = require('webpack');

var providePlugin = new webpack.ProvidePlugin({
    React: 'react'
});

module.exports = {
    context: './src',

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
                loaders: ['jsx-loader', 'react-hot', 'babel-loader']
            }
        ]
    }
};
