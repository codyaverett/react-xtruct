'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Serve {
    constructor() {
    }

    serve(options, callback) {
        let pathToWebpackDevServer;
        const pathToWebpackDevServerConfig = path.resolve(__dirname, './../configs/webpack.config.js');
        const env = options.cmd.options.env || 'dev';
        const portNumber = options.cmd.options.port || 8080;

        process.env.NODE_ENV = env;

        try {
            pathToWebpackDevServer = path.resolve(__dirname, './../node_modules/.bin/webpack-dev-server');
            fs.statSync(pathToWebpackDevServer);
        } catch (e) {
            pathToWebpackDevServer = path.resolve(process.cwd(), './node_modules/.bin/webpack-dev-server');
        }

        const webpackDevServer = spawn(
            pathToWebpackDevServer,
            ['--config', pathToWebpackDevServerConfig, '--port', portNumber],
            {stdio: 'inherit'}
        );

        webpackDevServer.on('close', (code) => {
            callback(code);
        });
    }
}

function serve(options, callback) {
    const server = new Serve();

    if (options.env === 'prod') {
        server.serve(options, callback);
    } else {
        server.serve(options, callback);
    }
}

module.exports = serve;