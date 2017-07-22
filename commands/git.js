'use strict';

'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const processCwd = process.cwd();

class Git {
    constructor() {
    }

    init(callback) {
        let projectPath = path.join(processCwd, './');

        const gitInit = spawn(
            'git',
            ['init', projectPath],
            {stdio: 'ignore'}
        );

        gitInit.on('error', (data) => {
            console.error(chalk.red(data.toString()));
        });

        gitInit.on('close', (code) => {
            callback(code);
        });
    }

    add(callback) {
        let projectPath = path.join(processCwd, './*.*');

        const gitAdd = spawn(
            'git',
            ['add', projectPath],
            {stdio: 'ignore'}
        );

        gitAdd.on('error', (data) => {
            console.error(chalk.red(data.toString()));
        });

        gitAdd.on('close', (code) => {
            callback(code);
        });
    }

    commit(callback) {
        let projectPath = path.join(processCwd, './');

        const gitCommit = spawn(
            'git',
            ['commit', '-m', 'Initial Commit', projectPath],
            {stdio: 'ignore'}
        );

        gitCommit.on('error', (data) => {
            console.error(chalk.red(data.toString()));
        });

        gitCommit.on('close', (code) => {
            callback(code);
        });
    }
}

module.exports = new Git();