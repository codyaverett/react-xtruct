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
        this.style = '';
    }

    project(options) {
        let projectPath;
        let projectSourcePath;
        this.style = options.cmd.style || 'css';

        if (options.name) {
            projectPath = path.join(process.cwd(), `./${options.name}`);
            projectSourcePath = path.join(projectPath, './src');

            fs.mkdir(projectPath, (error, data) => {
                if (error)
                    return console.warn(chalk.red(error));

                this.createProjectDirectoryFiles(options, projectPath);

                this.createSourceDirectoryAndFiles(projectSourcePath);

                generate({
                    type: 'component',
                    name: 'home',
                    style: this.style,
                    projectPath: projectPath
                }, (error, data) => {
                    if (error)
                        return console.log(chalk.error(error));

                    options.path = projectPath;

                    this.initGitAndInstallDependencies(options);
                });
            });
        } else {
            projectPath = process.cwd();
            projectSourcePath = path.join(projectPath, './src');
            options.name = path.basename(process.cwd());

            this.createProjectDirectoryFiles(options, projectPath);

            this.createSourceDirectoryAndFiles(projectSourcePath);

            generate({
                type: 'component',
                name: 'home',
                style:
                this.style
            }, (error, data) => {
                if (error)
                    return console.log(chalk.error(error));

                this.initGitAndInstallDependencies(options);
            });
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

        fs.createReadStream(path.resolve(templatePath, './react-xtruct.config.js')).on('data', (data) => {
            const data2String = data.toString();
            let dataReplaced = data2String.replace(/_XXNameXX_/g, options.name);

            dataReplaced = dataReplaced.replace(/_XXCSSXX_/g, this.style);

            fs.createWriteStream(path.join(projectPath, './react-xtruct.config.js')).write(dataReplaced);
        });

        fs.createReadStream(path.resolve(templatePath, './editorconfig')).on('data', (data) => {
            fs.createWriteStream(path.join(projectPath, './.editorconfig')).write(data.toString());
        });
    }

    createSourceDirectoryAndFiles(sourcePath) {
        const templatePath = path.resolve(__dirname, './../templates/source');

        fs.mkdir(sourcePath, (error, data) => {
            if (error)
                return console.warn(chalk.red(error));

            fs.createReadStream(path.resolve(templatePath, './bootstrap.js')).on('data', (data) => {
                fs.createWriteStream(path.join(sourcePath, './index.js')).write(data.toString());
            });

            fs.createReadStream(path.resolve(templatePath, './app.jsx')).on('data', (data) => {
                fs.createWriteStream(path.join(sourcePath, './app.component.jsx')).write(data.toString());
            });

            fs.createReadStream(path.resolve(templatePath, './styles.css')).on('data', (data) => {
                if (this.style === 'css')
                    fs.createWriteStream(path.join(sourcePath, './styles.css')).write(data.toString());
                else if (this.style === 'sass')
                    fs.createWriteStream(path.join(sourcePath, './styles.sass')).write(data.toString());
                else if (this.style === 'scss')
                    fs.createWriteStream(path.join(sourcePath, './styles.scss')).write(data.toString());
                else if (this.style === 'less')
                    fs.createWriteStream(path.join(sourcePath, './styles.less')).write(data.toString());
            });
        });
    }

    initGitAndInstallDependencies(options) {
        git.init(() => {
            git.add(() => {
                git.commit(() => {
                    if (!options.cmd.skipDependencies) {
                        npm.install(options, () => {
                            console.log(chalk.green('New project created successful!'));
                        });
                    } else {
                        console.log(chalk.green('New project created successful!'));
                    }
                });
            })
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