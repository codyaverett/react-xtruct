'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Build {
    constructor() {
    }

    run(options, callback) {
        const pathToWebpack = path.resolve(__dirname, './../node_modules/.bin/webpack');
        const pathToWebpackConfig = path.resolve(__dirname, './../configs/webpack.config.js');
        const webpack = spawn(
            pathToWebpack,
            ['--config', pathToWebpackConfig],
            {stdio: 'inherit'}
        );

        webpack.on('close', (code) => {
            callback(code)
        });
    }
}

function build(options, callback) {
    const build = new Build();

    if (options.env === 'prod') {
        build.run(options, callback);
    } else {
        build.run(options, callback);
    }
}

module.exports = build;