'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Serve {
    constructor() {
    }

    static run(options, callback) {
        let webpackDevServer;
        const portNumber = options.cmd.options.port || 8080;
        let webpackConfig = path.resolve(__dirname, './../configs/webpack.dev.config.js');

        if (options.cmd &&
            options.cmd.environment &&
            (options.cmd.environment.toLowerCase() === 'prod' ||
                options.cmd.environment.toLowerCase() === 'production')) {
            webpackConfig = path.resolve(__dirname, './../configs/webpack.prod.config.js');
        }

        process.env.NODE_ENV = options.cmd.environment || 'dev';

        try {
            webpackDevServer = path.resolve(__dirname, './../node_modules/.bin/webpack-dev-server');
            fs.statSync(webpackDevServer);
        } catch (e) {
            webpackDevServer = path.resolve(process.cwd(), './node_modules/.bin/webpack-dev-server');
        }

        const cmd = spawn(webpackDevServer, ['--config', webpackConfig, '--port', portNumber, '--open'], {stdio: 'inherit'});

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code);
        });
    }
}

module.exports = Serve;