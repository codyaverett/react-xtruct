'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');

class Lint {
    constructor() {
    }

    run(options, callback) {
        let pathToLint = '';
        const lintConfig = path.resolve(__dirname, './../configs/.eslintrc.js');

        try {
            pathToLint = path.resolve(__dirname, './../node_modules/.bin/eslint');
            fs.statSync(pathToWebpackDevServer);
        } catch (e) {
            pathToLint = path.resolve(process.cwd(), './node_modules/.bin/eslint');
        }

        const webpack = spawn(
            pathToLint,
            ['--config', lintConfig, path.resolve(process.cwd(), './src')],
            {stdio: 'inherit'}
        );

        webpack.on('close', (code) => {
            callback(code)
        });
    }
}

function lint(options, callback) {
    const linter = new Lint();

    if (options.env === 'prod') {
        linter.run(options, callback);
    } else {
        linter.run(options, callback);
    }
}

module.exports = lint;
