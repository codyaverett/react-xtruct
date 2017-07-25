'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const common = require('./common');

class Install {
    constructor() {
    }

    static run(options, callback) {
        const npm = spawn('npm', ['i'], {cwd: options.path || './', stdio: 'inherit'});

        if (!common.config().fromProcessDir)
            return callback(`Directory is not a react-xtruct project.\nRun ${chalk.green('rx new project')} or ${chalk.green('rx new project NAME')} to create an react-xtruct project.`, null);

        npm.on('error', (data) => {
            callback(data, null);
        });

        npm.on('close', (code) => {
            callback(null, code);
        });
    }
}

module.exports = Install;