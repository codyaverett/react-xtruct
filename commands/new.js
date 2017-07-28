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
                    path: projectPath
                }, (error, data) => {
                    if (error)
                        return callback(error, null);

                    this.initGitAndInstallDependencies({
                        path: projectPath,
                        cmd: options.cmd
                    }, (error, data) => {
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

                this.initGitAndInstallDependencies({
                    path: projectPath,
                    cmd: options.cmd
                }, (error, data) => {
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
            const packageContent = JSON.parse(data.toString());

            packageContent.name = options.name;
            packageContent.repository = options.name;

            if (options.cmd.router) {
                packageContent.dependencies = Object.assign(packageContent.dependencies, {
                    'react-router-dom': '^4.1.2'
                });
            }

            if (options.cmd.redux) {
                packageContent.dependencies = Object.assign(packageContent.dependencies, {
                    'react-redux': '^5.0.5',
                    'react-redux-router': '0.0.9',
                    'redux': '^3.7.2'
                });
            }

            if (options.cmd.material) {
                packageContent.dependencies = Object.assign(packageContent.dependencies, {
                    'material-ui': '^0.18.7'
                });
            }

            fs.createWriteStream(path.join(projectPath, './package.json')).write(JSON.stringify(packageContent, null, 4));
        });

        fs.createReadStream(path.resolve(templatePath, './react-xtruct.json')).on('data', (data) => {
            const reactXtructConfig = JSON.parse(data.toString());

            reactXtructConfig.project.name = options.name;
            reactXtructConfig.project.style = options.cmd.style;

            fs.createWriteStream(path.join(projectPath, './react-xtruct.json')).write(JSON.stringify(reactXtructConfig, null, 4));
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
                // else if (options.cmd.style === 'styl')
                //     fs.createWriteStream(path.join(sourcePath, './styles.styl')).write(data.toString());
                else
                    fs.createWriteStream(path.join(sourcePath, './styles.css')).write(data.toString());
            });
        });
    }

    static initGitAndInstallDependencies(options, callback) {
        repository.init(options, (error, data) => {
            if (error)
                callback(error, null);

            repository.add(options, (error, data) => {
                if (error)
                    callback(error, null);

                repository.commit(options, (error, data) => {
                    if (error)
                        callback(error, null);

                    if (!options.cmd.skipDependencies) {
                        const localConfig = common.readLocalConfig();
                        const globalConfig = common.readGlobalConfig();
                        const dependencyManagerLocal = localConfig.options && localConfig.options.dependencyManager ?
                            local.options.dependencyManager : null;
                        const dependencyManagerGlobal = globalConfig.options && globalConfig.options.dependencyManager ?
                            globalConfig.options.dependencyManager : null;
                        const dependencyManager = dependencyManagerLocal || dependencyManagerGlobal || 'npm';

                        this.runDependencyManager(dependencyManager, options, (error, data) => {
                            callback(error, data);
                        });
                    } else {
                        callback(null, data);
                    }
                });
            })
        });
    }

    static runDependencyManager(dependencyManagerName, options, callback) {
        if (dependencyManagerName.toLowerCase() === 'yarn') {
            install.yarn(options, (error, data) => {
                if (error)
                    return callback(error, null);

                callback(null, data);
            });
        } else {
            install.npm(options, (error, data) => {
                if (error)
                    return callback(error, null);

                callback(null, data);
            });
        }
    }
}

module.exports = New;