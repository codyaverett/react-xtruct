'use strict';

const path = require('path');

class Common {
    constructor() {
    }

    static config() {
        let config = {};

        try {
            config = require(path.resolve(process.cwd(), './react-xtruct.config'));
            config.fromProcessDir = true;
        } catch (e) {
            config = require(path.resolve(__dirname, './../configs/react-xtruct.config'));
            config.fromProcessDir = false;
        }

        return config;
    }

    static toTitleCase(name) {
        const nameTemp = name.split(' ');

        for (let i = 0; i < nameTemp.length; i++) {
            let j = nameTemp[i].charAt(0).toUpperCase();

            nameTemp[i] = j + nameTemp[i].substr(1);
        }

        return nameTemp.join(' ');
    };

    static getUserHomeDirectory() {
        return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
    }
}

module.exports = Common;