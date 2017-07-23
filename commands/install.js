'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class NPM {
    constructor() {
    }

    install(options, callback) {
        const npm = spawn(
            'npm',
            ['i'],
            {
                cwd: options.path || './',
                stdio: 'inherit'
            }
        );

        npm.on('error', (data) => {
            console.log(chalk.red(data));
        });

        npm.on('close', (code) => {
            callback(code);
        });
    }
}

module.exports = new NPM();