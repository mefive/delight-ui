var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    devtool: 'source-map',

    entry: [
        './test/main.js',
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/only-dev-server',
    ],

    output: {
        path: 'build',
        publicPath: 'http://localhost:9000/',
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
                    context: 'src/styles/'
                }
            }
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
