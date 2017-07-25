'use strict';

const fs = require('fs');
const path = require('path');

class Common {
    constructor() {
    }

    static config() {
        let config = {};

        try {
            config = require(path.resolve(process.cwd(), './react-xtruct.config'));
        } catch (e) {
            config = require(path.resolve(__dirname, './../configs/react-xtruct.config'));
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
}

module.exports = Common;