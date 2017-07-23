'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Build {
    constructor() {
    }

    run(options, callback) {
        let pathToWebpack;
        const pathToWebpackConfig = path.resolve(__dirname, './../configs/webpack.config.js');

        try {
            pathToWebpack = path.resolve(__dirname, './../node_modules/.bin/webpack');
            fs.statSync(pathToWebpackDevServer);
        } catch (e) {
            pathToWebpack = path.resolve(process.cwd(), './node_modules/.bin/webpack');
        }

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