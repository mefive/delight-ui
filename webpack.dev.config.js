var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    devtool: 'source-map',

    entry: [
        './test/main.js'
    ],

    output: {
        path: 'build',
        publicPath: './',
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
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
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