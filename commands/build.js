'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const common = require('./common');

class Build {
    constructor() {
    }

    static run(options, callback) {
        let webpack = '';

        if (!common.config().fromProcessDir)
            return callback(`Directory is not a react-xtruct project.\nRun ${chalk.green('rx new project')} or ${chalk.green('rx new project NAME')} to create an react-xtruct project.`, null);

        const webpackConfig = path.resolve(__dirname, './../configs/webpack.config.js');

        process.env.NODE_ENV = options.cmd.options.env || 'dev';

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