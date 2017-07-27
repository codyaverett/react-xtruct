'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Git {
    constructor() {
    }

    static init(options, callback) {
        const cmd = spawn('git', ['init'], {
            cwd: options.path,
            stdio: 'ignore'
        });

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code);
        });
    }

    static add(options, callback) {
        const cmd = spawn('git', ['add', '.'], {
            cwd: options.path,
            stdio: 'ignore'
        });

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code);
        });
    }

    static commit(options, callback) {
        const cmd = spawn('git', ['commit', '-m', 'Initial Commit'], {
            cwd: options.path,
            stdio: 'ignore'
        });

        cmd.on('error', (data) => {
            callback(data, null);
        });

        cmd.on('close', (code) => {
            callback(null, code);
        });
    }
}

module.exports = Git;