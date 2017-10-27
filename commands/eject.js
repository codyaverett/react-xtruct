'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Eject {
    constructor() {
    }

    static run(options, callback) {
        callback('Command not available yet!', null);
    }
}

module.exports = Eject;
