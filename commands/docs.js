'use strict';

const chalk = require('chalk');
const opn = require('opn');

class Docs {
    constructor() {
    }

    static run(options) {
        opn(options.url).then((error, data) => {
            if (error)
                return console.error(chalk.red(error));
        });

        process.exit();
    }
}

module.exports = Docs;
