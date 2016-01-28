var webpack = require('webpack');
var path = require('path');

module.exports = {

    devtool: 'source-map',

    entry: [
        'main.js',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
    ],

    output: {
        path: 'build',
        publicPath: 'http://localhost:8080/',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'react-hot',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|dep)/,
                query: {
                    presets: ['es2015', 'react', 'node5'],
                }
            }
        ]
    },

    resolve: {
        root: [
            __dirname + '/src/',
        ]
    },

    devServer: {
        host: '0.0.0.0',
        proxy: {
            '/mock/*': 'http://127.0.0.1:3000'
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: false,
            inject: true,
            template: __dirname + '/view/index.html'
        })
    ]

};
