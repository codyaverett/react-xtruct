'use strict';

'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class NPM {
    constructor() {
    }

    install(callback) {
        let projectPath = path.join(process.cwd(), './');

        const npm = spawn('npm', ['i']);

        npm.stdout.on('data', (data) => {
            console.log(chalk.green(data.toString()));
        });

        npm.stderr.on('data', (data) => {
            console.error(chalk.red(data.toString()));
        });

        npm.on('close', (code) => {
            callback(code);
        });
    }
}

module.exports = new NPM();