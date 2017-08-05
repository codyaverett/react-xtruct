'use strict';

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Check {
    constructor() {
    }

    static version(options, callback) {
        if (options.dependencyManager.toString() === 'yarn') {
            this.yarnVersion(options, (error, data) => {
                if (error)
                    return callback(error, null);

                callback(null, data);
            });
        } else {
            this.npmVersion(options, (error, data) => {
                if (error)
                    return callback(error, null);

                callback(null, data);
            });
        }
    }

    static npmVersion(options, callback) {
        const npm = spawn('npm', ['show', options.package, 'version']);

        npm.stdout.on('data', (data) => {
            callback(null, data.toString().replace(/\n/, ''));
        });

        npm.stderr.on('error', (error) => {
            callback(error, null);
        });

        npm.on('error', (data) => {
            callback(data, null);
        });

        npm.on('close', (code) => {
            callback(null, code);
        });
    }

    static yarnVersion(options, callback) {
        const yarn = spawn('yarn', ['info', options.package, 'version']);

        yarn.stdout.on('data', (data) => {
            callback(null, data);
        });

        yarn.stderr.on('error', (error) => {
            callback(error, null);
        });

        yarn.on('error', (data) => {
            callback(data, null);
        });

        yarn.on('close', (code) => {
            callback(null, code);
        });
    }
}

module.exports = Check;
