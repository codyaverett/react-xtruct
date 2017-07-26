'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const processCwd = process.cwd();

class Git {
    constructor() {
    }

    static init(callback) {
        let projectPath = path.join(processCwd, './');

        const cmd = spawn('git', ['init', projectPath], {stdio: 'ignore'});

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code);
        });
    }

    static add(callback) {
        let projectPath = path.join(processCwd, './*.*');

        const cmd = spawn('git', ['add', projectPath], {stdio: 'ignore'});

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code);
        });
    }

    static commit(callback) {
        let projectPath = path.join(processCwd, './');

        const cmd = spawn('git', ['commit', '-m', 'Initial Commit', projectPath], {stdio: 'ignore'});

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code);
        });
    }
}

module.exports = Git;