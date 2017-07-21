'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const git = require('./git');
const generate = require('./generate');
const npm = require('./install');

class Structure {
    constructor() {

    }

    project(options) {
        let projectPath;
        let src;

        if (options.name) {
            projectPath = path.join(process.cwd(), `./${options.name}`);
            src = path.join(projectPath, './src');

            fs.mkdir(projectPath, (error, data) => {
                if (error)
                    return console.warn(chalk.red(error));

                fs.createReadStream(path.resolve(__dirname, './../templates/index.html')).pipe(fs.createWriteStream(path.join(projectPath, './index.html')));
                fs.createReadStream(path.resolve(__dirname, './../templates/gitignore')).pipe(fs.createWriteStream(path.join(projectPath, './.gitignore')));
                fs.createReadStream(path.resolve(__dirname, './../templates/package.json')).pipe(fs.createWriteStream(path.join(projectPath, './package.json')));

                fs.mkdir(src, (error, data) => {
                    if (error)
                        return console.warn(chalk.red(error));

                    fs.createReadStream(path.resolve(__dirname, './../templates/bootstrap.js')).pipe(fs.createWriteStream(path.join(src, 'index.js')));
                    fs.createReadStream(path.resolve(__dirname, './../templates/app.jsx')).pipe(fs.createWriteStream(path.join(src, './app.component.jsx')));

                    generate({type: 'component', name: 'home'}, (error, data) => {
                        git.init(() => {
                            git.add(() => {
                                git.commit(() => {
                                    npm.install(() => {
                                        console.log(chalk.blue('Done setting project!'));
                                    });
                                });
                            })
                        });
                    });

                });
            });
        } else {
            projectPath = process.cwd();
            src = path.join(projectPath, './src');

            fs.createReadStream(path.resolve(__dirname, './../templates/index.html')).pipe(fs.createWriteStream(path.join(projectPath, './index.html')));
            fs.createReadStream(path.resolve(__dirname, './../templates/gitignore')).pipe(fs.createWriteStream(path.join(projectPath, './.gitignore')));
            fs.createReadStream(path.resolve(__dirname, './../templates/package.json')).pipe(fs.createWriteStream(path.join(projectPath, './package.json')));

            fs.mkdir(src, (error, data) => {
                if (error)
                    return console.warn(chalk.red(error));

                fs.createReadStream(path.resolve(__dirname, './../templates/bootstrap.js')).pipe(fs.createWriteStream(path.join(src, 'index.js')));
                fs.createReadStream(path.resolve(__dirname, './../templates/app.jsx')).pipe(fs.createWriteStream(path.join(src, './app.component.jsx')));

                generate({type: 'component', name: 'home'}, (error, data) => {
                    git.init(() => {
                        git.add(() => {
                            git.commit(() => {
                                npm.install(() => {
                                    console.log(chalk.blue('Done setting project!'));
                                });
                            });
                        })
                    });
                });

            });
        }

    }

    library(options) {

    }
}

function createNewStructure(options) {
    const structure = new Structure();

    if (options.type === 'library') {
        structure.library(options)
    } else {
        structure.project(options)
    }
}

module.exports = createNewStructure;