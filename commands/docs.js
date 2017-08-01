'use strict';

const chalk = require('chalk');
const opn = require('opn');

class Docs {
    constructor() {
    }

    static run(options) {
        opn(options.url);
    }
}

module.exports = Docs;
