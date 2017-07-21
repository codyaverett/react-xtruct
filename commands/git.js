'use strict';

'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Git {
    constructor() {

    }

    init(options) {
        let projectPath = path.join(process.cwd(), './');

        const gitInit = spawn('git', ['init', projectPath]);

        gitInit.stdout.on('data', (data) => {
            console.log(chalk.green(data.toString()));
        });

        gitInit.stderr.on('data', (data) => {
            console.error(chalk.red(data.toString()));
        });

    }
}

module.exports = new Git();