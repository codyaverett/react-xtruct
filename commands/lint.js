'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Lint {
    constructor() {
    }

    static run(options, callback) {
        let lint = '';
        let config = '';

        try {
            lint = path.resolve(__dirname, './../node_modules/.bin/eslint');
            fs.statSync(lint);
        } catch (e) {
            lint = path.resolve(process.cwd(), './node_modules/.bin/eslint');
        }

        try {
            config = path.resolve(process.cwd(), './.eslintrc.js');
            fs.statSync(config);
        } catch (e) {
            if (e.code === 'ENOENT')
                return callback(`Lint configuration file not found in ${e.path} `, null);
            else
                return callback(e, null);
        }

        const cmd = spawn(lint, ['--config', config, path.resolve(process.cwd(), './src')], {stdio: 'inherit'});

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code)
        });
    }
}

module.exports = Lint;
