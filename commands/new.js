'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const repository = require('./repository');
const generate = require('./generate');
const install = require('./install');
const common = require('./common');

class New {
    constructor() {
    }

    static project(options, callback) {
        let projectPath = '';
        let projectSourcePath = '';

        options.cmd.style = options.cmd.style || 'css';

        if (options.name) {
            projectPath = path.join(process.cwd(), `./${options.name}`);
            projectSourcePath = path.join(projectPath, './src');

            fs.mkdir(projectPath, (error, data) => {
                if (error)
                    return callback(error, null);

                this.createProjectDirectoryFiles(options, projectPath);

                this.createSourceDirectoryAndFiles(options, projectSourcePath);

                generate.component({
                    type: 'component',
                    name: 'home',
                    cmd: options.cmd,
                    projectPath: projectPath
                }, (error, data) => {
                    if (error)
                        return callback(error, null);

                    options.path = projectPath;

                    this.initGitAndInstallDependencies(options, (error, data) => {
                        if (error)
                            return callback(error, null);

                        callback(null, 'New project created successful!');
                    });
                });
            });
        } else {
            projectPath = process.cwd();
            projectSourcePath = path.join(projectPath, './src');
            options.name = path.basename(process.cwd());

            this.createProjectDirectoryFiles(options, projectPath);

            this.createSourceDirectoryAndFiles(options, projectSourcePath);

            generate.component({
                type: 'component',
                name: 'home',
                cmd: options.cmd
            }, (error, data) => {
                if (error)
                    return callback(error, null);

                this.initGitAndInstallDependencies(options, (error, data) => {
                    if (error)
                        return callback(error, null);

                    callback(null, 'New project created successful!');
                });
            });
        }
    }

    static createProjectDirectoryFiles(options, projectPath) {
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

            dataReplaced = dataReplaced.replace(/_XXCSSXX_/g, options.cmd.style);

            fs.createWriteStream(path.join(projectPath, './react-xtruct.config.js')).write(dataReplaced);
        });

        fs.createReadStream(path.resolve(templatePath, './editorconfig')).on('data', (data) => {
            fs.createWriteStream(path.join(projectPath, './.editorconfig')).write(data.toString());
        });
    }

    static createSourceDirectoryAndFiles(options, sourcePath) {
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
                if (options.cmd.style === 'sass')
                    fs.createWriteStream(path.join(sourcePath, './styles.sass')).write(data.toString());
                else if (options.cmd.style === 'scss')
                    fs.createWriteStream(path.join(sourcePath, './styles.scss')).write(data.toString());
                else if (options.cmd.style === 'less')
                    fs.createWriteStream(path.join(sourcePath, './styles.less')).write(data.toString());
                else
                    fs.createWriteStream(path.join(sourcePath, './styles.css')).write(data.toString());
            });
        });
    }

    static initGitAndInstallDependencies(options, callback) {
        repository.init((error, data) => {
            if (error)
                callback(error, null);

            repository.add((error, data) => {
                if (error)
                    callback(error, null);

                repository.commit((error, data) => {
                    if (error)
                        callback(error, null);

                    if (!options.cmd.skipDependencies) {
                        install.run(options, (error, data) => {
                            if (error)
                                return callback(error, null);

                            callback(null, data);
                        });
                    } else {
                        callback(null, data);
                    }
                });
            })
        });
    }
}

module.exports = New;