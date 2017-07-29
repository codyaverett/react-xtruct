'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Build {
    constructor() {
    }

    static run(options, callback) {
        let webpack = '';
        let webpackConfig = path.resolve(__dirname, './../configs/webpack.dev.config.js');

        if (options.cmd &&
            options.cmd.environment &&
            (options.cmd.environment.toLowerCase() === 'prod' ||
                options.cmd.environment.toLowerCase() === 'production')) {
            webpackConfig = path.resolve(__dirname, './../configs/webpack.prod.config.js');
        }

        process.env.NODE_ENV = options.cmd.environment || 'dev';

        try {
            webpack = path.resolve(__dirname, './../node_modules/.bin/webpack');
            fs.statSync(webpack);
        } catch (e) {
            webpack = path.resolve(process.cwd(), './node_modules/.bin/webpack');
        }

        const cmd = spawn(webpack, ['--config', webpackConfig], {stdio: 'inherit'});

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code)
        });
    }
}

module.exports = Build;