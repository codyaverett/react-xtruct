const path = require('path');
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: indexPath,
            filename: 'index.html',
            inject: 'body'
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    }
};