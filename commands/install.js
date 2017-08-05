'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Install {
    constructor() {
    }

    static npm(options, callback) {
        const npm = spawn('npm', ['i'], {cwd: options.path || './', stdio: 'inherit'});

        npm.on('error', (data) => {
            callback(data, null);
        });

        npm.on('close', (code) => {
            callback(null, code);
        });
    }

    static yarn(options, callback) {
        const yarn = spawn('yarn', ['install'], {cwd: options.path || './', stdio: 'inherit'});

        yarn.on('error', (data) => {
            callback(data, null);
        });

        yarn.on('close', (code) => {
            callback(null, code);
        });
    }
}

module.exports = Install;
