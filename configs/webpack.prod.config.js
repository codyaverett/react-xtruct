const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const jeet = require('jeet');
const nib = require('nib');
// var ReactToHtmlPlugin = require('react-to-html-webpack-plugin');

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
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        }
                    ],
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]

                })
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: indexPath,
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.sass', '.less', '.scss', '.styl']
    }
};