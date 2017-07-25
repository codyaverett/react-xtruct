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
        const lintConfig = path.resolve(__dirname, './../configs/.eslintrc.js');

        try {
            lint = path.resolve(__dirname, './../node_modules/.bin/eslint');
            fs.statSync(lint);
        } catch (e) {
            lint = path.resolve(process.cwd(), './node_modules/.bin/eslint');
        }

        const cmd = spawn(lint, ['--config', lintConfig, path.resolve(process.cwd(), './src')], {stdio: 'inherit'});

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code)
        });
    }
}

module.exports = Lint;
