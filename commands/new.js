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

                this.createProjectDirectoryFiles(__dirname, projectPath);

                this.createSrcDirectory(__dirname, src);
            });
        } else {
            projectPath = process.cwd();
            src = path.join(projectPath, './src');

            this.createProjectDirectoryFiles(__dirname, projectPath);

            this.createSrcDirectory(__dirname, src);
        }

    }

    createProjectDirectoryFiles(fromPath, toPath) {
        fs.createReadStream(path.resolve(fromPath, './../templates/index.html')).on('data', (data) => {
            fs.createWriteStream(path.join(toPath, './index.html')).write(data.toString());
        });

        fs.createReadStream(path.resolve(fromPath, './../templates/gitignore')).on('data', (data) => {
            fs.createWriteStream(path.join(toPath, './.gitignore')).write(data.toString());
        });

        fs.createReadStream(path.resolve(fromPath, './../templates/package.json')).on('data', (data) => {
            fs.createWriteStream(path.join(toPath, './package.json')).write(data.toString());
        });
    }

    createSrcDirectoryFiles(fromPath, toPath) {
        fs.createReadStream(path.resolve(fromPath, './../templates/bootstrap.js')).on('data', (data) => {
            fs.createWriteStream(path.join(toPath, 'index.js')).write(data.toString());
        });
        fs.createReadStream(path.resolve(fromPath, './../templates/app.jsx')).on('data', (data) => {
            fs.createWriteStream(path.join(toPath, './app.component.jsx')).write(data.toString());
        });
    }

    createSrcDirectory(fromPath, toPath) {
        fs.mkdir(toPath, (error, data) => {
            if (error)
                return console.warn(chalk.red(error));

            this.createSrcDirectoryFiles(fromPath, toPath);

            this.createHomeComponent();
        });
    }

    createHomeComponent() {
        generate({type: 'component', name: 'home'}, (error, data) => {
            git.init(() => {
                git.add(() => {
                    git.commit(() => {
                        npm.install(() => {
                            console.log(chalk.green('New project created successful!'));
                        });
                    });
                })
            });
        });
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