'use strict';

'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Git {
    constructor() {

    }

    init(callback) {
        let projectPath = path.join(process.cwd(), './');

        const gitInit = spawn('git', ['init', projectPath]);

        gitInit.stdout.on('data', (data) => {
            console.log(chalk.green(data.toString()));
        });

        gitInit.stderr.on('data', (data) => {
            console.error(chalk.red(data.toString()));
        });

        gitInit.on('close', (code) => {
            callback(code);
        });
    }

    add(callback) {
        let projectPath = path.join(process.cwd(), './*.*');

        const gitAdd = spawn('git', ['add', projectPath]);

        gitAdd.stdout.on('data', (data) => {
            console.log(chalk.green(data.toString()));
        });

        gitAdd.stderr.on('data', (data) => {
            console.error(chalk.red(data.toString()));
        });

        gitAdd.on('close', (code) => {
            callback(code);
        });
    }

    commit(callback) {
        let projectPath = path.join(process.cwd(), './');

        const gitCommit = spawn('git', ['commit', '-m', 'Initial Commit', projectPath]);

        gitCommit.stdout.on('data', (data) => {
            console.log(chalk.green(data.toString()));
        });

        gitCommit.stderr.on('data', (data) => {
            console.error(chalk.red(data.toString()));
        });

        gitCommit.on('close', (code) => {
            callback(code);
        });
    }
}

module.exports = new Git();