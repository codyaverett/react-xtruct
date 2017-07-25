'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const processCwd = process.cwd();
const common = require('./common');

class Git {
    constructor() {
    }

    static init(callback) {
        let projectPath = path.join(processCwd, './');

        if (!common.config().fromProcessDir)
            return callback(`Directory is not a react-xtruct project.\nRun ${chalk.green('rx new project')} or ${chalk.green('rx new project NAME')} to create an react-xtruct project.`, null);

        const gitInit = spawn('git', ['init', projectPath], {stdio: 'ignore'});

        gitInit.on('error', (data) => {
            callback(data, null);
        });

        gitInit.on('close', (code) => {
            callback(null, code);
        });
    }

    static add(callback) {
        let projectPath = path.join(processCwd, './*.*');

        if (common.config().fromProcessDir)
            callback('Directory is not a react-xtruct project!', null);

        const gitAdd = spawn('git', ['add', projectPath], {stdio: 'ignore'});

        gitAdd.on('error', (data) => {
            callback(data, null);
        });

        gitAdd.on('close', (code) => {
            callback(null, code);
        });
    }

    static commit(callback) {
        let projectPath = path.join(processCwd, './');

        if (common.config().fromProcessDir)
            callback('Directory is not a react-xtruct project!', null);

        const gitCommit = spawn('git', ['commit', '-m', 'Initial Commit', projectPath], {stdio: 'ignore'});

        gitCommit.on('error', (data) => {
            callback(data, null);
        });

        gitCommit.on('close', (code) => {
            callback(null, code);
        });
    }
}

module.exports = Git;