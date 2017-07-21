'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Build {
    constructor() {

    }

    run(options) {
        const pathToWebpack = path.resolve(__dirname, './../node_modules/.bin/webpack');
        const pathToWebpackConfig = path.resolve(__dirname, './../configs/webpack.config.js');
        const webpack = spawn(pathToWebpack, ['--config', pathToWebpackConfig]);

        webpack.stdout.on('data', (data) => {
            console.log(chalk.green(data.toString()));
        });

        webpack.stderr.on('data', (data) => {
            console.error(chalk.red(data.toString()));
        });

    }
}

function build(options) {
    const build = new Build();

    if (options.env === 'prod') {
        build.run(options)
    } else {
        build.run(options)
    }
}

module.exports = build;