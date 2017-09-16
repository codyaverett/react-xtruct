'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const common = require('./common');

class Set {
    constructor() {
    }

    static run(options, callback) {
        if (options.cmd.global) {
            const home = path.resolve(process.cwd(), `${common.getUserHomeDirectory()}/.react-xtruct.json`);
            const customOptions = options.keyValue.split('=');

            try {
                let data = fs.readFileSync(home, {encoding: 'utf-8'});

                data = JSON.parse(data);

                data.options[customOptions[0]] = customOptions[1];

                fs.writeFileSync(home, JSON.stringify(data, null, 4));
            } catch (e) {
                let data = {
                    options: {}
                };

                data.options[customOptions[0]] = customOptions[1];

                fs.writeFileSync(home, JSON.stringify(data, null, 4));
            }

            callback(null, 'Global configuration set successful!');

        } else {
            const home = path.resolve(process.cwd(), './react-xtruct.json');
            const customOptions = options.keyValue.split('=');

            try {
                let data = fs.readFileSync(home, {encoding: 'utf-8'});

                data = JSON.parse(data);

                data.options[customOptions[0]] = customOptions[1];

                fs.writeFileSync(home, JSON.stringify(data, null, 4));

                callback(null, 'Global configuration set successful!');
            } catch (e) {
                callback(e, null);
            }
        }
    }
}

module.exports = Set;
