var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

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
            },
            {
                test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]',
                    context: 'test/styles/'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: false,
            inject: true,
            template: __dirname + '/view/index.html'
        }),
        new CleanWebpackPlugin(['build'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]

};
