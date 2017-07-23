const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryPath = path.resolve(process.cwd(), './src/index.js');
const outputPath = path.resolve(process.cwd(), './dist');
const indexPath = path.resolve(process.cwd(), './index.html');

module.exports = {
    entry: entryPath,
    output: {
        path: outputPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        'es2015',
                        'react'
                    ]
                }
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        'es2015',
                        'react'
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                exclude: /node_modules/,
                query: {
                    modules: true
                }
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: indexPath,
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js"
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    }
};