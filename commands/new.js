'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const git = require('./git');
const generate = require('./generate');
const npm = require('./install');
const common = require('./common');

class Structure {
    constructor() {
    }

    project(options) {
        let projectPath;
        let projectSourcePath;

        if (options.name) {
            projectPath = path.join(process.cwd(), `./${options.name}`);
            projectSourcePath = path.join(projectPath, './src');

            fs.mkdir(projectPath, (error, data) => {
                if (error)
                    return console.warn(chalk.red(error));

                this.createProjectDirectoryFiles(options, projectPath);

                this.createSourceDirectory(projectSourcePath);
            });
        } else {
            projectPath = process.cwd();
            projectSourcePath = path.join(projectPath, './src');
            options.name = path.basename(process.cwd());

            this.createProjectDirectoryFiles(options, projectPath);

            this.createSourceDirectory(projectSourcePath);
        }
    }

    createProjectDirectoryFiles(options, projectPath) {
        const templatePath = path.resolve(__dirname, './../templates/project');

        fs.createReadStream(path.resolve(templatePath, './index.html')).on('data', (data) => {
            const data2String = data.toString();
            let dataReplaced = data2String.replace(/_XXNameXX_/g, options.name);

            fs.createWriteStream(path.join(projectPath, './index.html')).write(dataReplaced);
        });

        fs.createReadStream(path.resolve(templatePath, './gitignore')).on('data', (data) => {
            fs.createWriteStream(path.join(projectPath, './.gitignore')).write(data.toString());
        });

        fs.createReadStream(path.resolve(templatePath, './package.json')).on('data', (data) => {
            const data2String = data.toString();
            let dataReplaced = data2String.replace(/xxNamexx/g, options.name);

            fs.createWriteStream(path.join(projectPath, './package.json')).write(dataReplaced);
        });

        fs.createReadStream(path.resolve(templatePath, './react-xtruct.js')).on('data', (data) => {
            const data2String = data.toString();
            let dataReplaced = data2String.replace(/_XXNameXX_/g, options.name);

            fs.createWriteStream(path.join(projectPath, './react-xtruct.js')).write(dataReplaced);
        });

        fs.createReadStream(path.resolve(templatePath, './editorconfig')).on('data', (data) => {
            fs.createWriteStream(path.join(projectPath, './.editorconfig')).write(data.toString());
        });
    }

    createSourceDirectoryFiles(sourcePath) {
        const templatePath = path.resolve(__dirname, './../templates/source');

        fs.createReadStream(path.resolve(templatePath, './bootstrap.js')).on('data', (data) => {
            fs.createWriteStream(path.join(sourcePath, './index.js')).write(data.toString());
        });

        fs.createReadStream(path.resolve(templatePath, './app.jsx')).on('data', (data) => {
            fs.createWriteStream(path.join(sourcePath, './app.component.jsx')).write(data.toString());
        });

        fs.createReadStream(path.resolve(templatePath, './styles.css')).on('data', (data) => {
            fs.createWriteStream(path.join(sourcePath, './styles.css')).write(data.toString());
        });
    }

    createSourceDirectory(sourcePath) {
        fs.mkdir(sourcePath, (error, data) => {
            if (error)
                return console.warn(chalk.red(error));

            this.createSourceDirectoryFiles(sourcePath);

            this.createHomeComponent({type: 'component', name: 'home'});
        });
    }

    createHomeComponent(options) {
        generate(options, (error, data) => {
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

    console.log(chalk.green(`New ${options.type}'s structure creation in progress...`));

    if (options.type === 'library') {
        structure.library(options)
    } else {
        structure.project(options)
    }
}

module.exports = createNewStructure;