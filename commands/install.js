'use strict';

const chalk = require('chalk');
const spawn = require('cross-spawn');

class NPM {
    constructor() {
    }

    install(callback) {
        const npm = spawn(
            'npm', ['i'],
            {stdio: 'inherit'}
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