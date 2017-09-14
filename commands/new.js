'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const chalk = require('chalk');
const ejs = require('ejs');
const repository = require('./repository');
const generate = require('./generate');
const install = require('./install');
const common = require('../libs/common');

class New {
    constructor() {
    }

    static project(options, callback) {
        let projectPath = '';
        let projectSourcePath = '';

        options.cmd.style = options.cmd.style || 'css';

        if (options.name) {
            projectPath = path.join(process.cwd(), options.name);
            projectSourcePath = path.join(projectPath, './src');

            mkdirp(projectPath, (error, data) => {
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

        fs.createReadStream(path.resolve(templatePath, './index_')).on('data', (data) => {
            const templateOptions = {
                appTitle: options.name
            };
            const compiledTemplate = ejs.render(data.toString(), templateOptions);

            fs.createWriteStream(path.join(projectPath, './index.html')).write(compiledTemplate);
        });

        fs.createReadStream(path.resolve(templatePath, './gitignore_')).on('data', (data) => {
            fs.createWriteStream(path.join(projectPath, './.gitignore')).write(data.toString());
        });

        fs.createReadStream(path.resolve(templatePath, './package_')).on('data', (data) => {
            const templateOptions = {
                appName: options.name,
                appRepo: options.name,
                router: options.cmd.router,
                redux: options.cmd.redux
            };
            const compiledTemplate = ejs.render(data.toString(), templateOptions);

            fs.createWriteStream(path.join(projectPath, './package.json')).write(compiledTemplate);
        });

        fs.createReadStream(path.resolve(templatePath, './react-xtruct_')).on('data', (data) => {
            const templateOptions = {
                appName: options.name,
                appStyles: options.cmd.style,
                redux: options.cmd.redux,
                router: options.cmd.router
            };
            const compiledTemplate = ejs.render(data.toString(), templateOptions);

            fs.createWriteStream(path.join(projectPath, './react-xtruct.json')).write(compiledTemplate);
        });

        fs.createReadStream(path.resolve(templatePath, './readme_')).on('data', (data) => {
            const templateOptions = {
                appName: options.name,
                appVersion: options.version
            };
            const compiledTemplate = ejs.render(data.toString(), templateOptions);

            fs.createWriteStream(path.join(projectPath, './readme.md')).write(compiledTemplate);
        });

        fs.createReadStream(path.resolve(templatePath, './editorconfig_')).on('data', (data) => {
            fs.createWriteStream(path.join(projectPath, './.editorconfig')).write(data.toString());
        });

        fs.createReadStream(path.resolve(templatePath, './eslintrc_')).on('data', (data) => {
            fs.createWriteStream(path.join(projectPath, './.eslintrc.js')).write(data.toString());
        });
    }

    static createSourceDirectoryAndFiles(options, sourcePath) {
        const templatePath = path.resolve(__dirname, './../templates/source');
        const assetsPath = path.resolve(__dirname, './../templates/assets');

        mkdirp(sourcePath, (error, data) => {
            if (error)
                return console.warn(chalk.red(error));

            const sourceAssetsPath = path.join(sourcePath, 'assets');

            mkdirp(sourceAssetsPath, (error, data) => {
                if (error)
                    return console.warn(chalk.red(error));

                fs.createReadStream(path.resolve(assetsPath, './react-xtruct-logo.png')).on('data', (data) => {
                    fs.createWriteStream(path.join(sourceAssetsPath, './react-xtruct-logo.png')).write(data);
                });
            });

            fs.createReadStream(path.resolve(templatePath, './index_')).on('data', (data) => {
                const templateOptions = {
                    redux: options.cmd.redux,
                    stylesExtension: options.cmd.style
                };
                const compiledTemplate = ejs.render(data.toString(), templateOptions);

                fs.createWriteStream(path.join(sourcePath, './index.jsx')).write(compiledTemplate);
            });

            fs.createReadStream(path.resolve(templatePath, './app_')).on('data', (data) => {
                const templateOptions = {
                    router: options.cmd.router
                };
                const compiledTemplate = ejs.render(data.toString(), templateOptions);

                fs.createWriteStream(path.join(sourcePath, './app.component.jsx')).write(compiledTemplate);
            });

            fs.createReadStream(path.resolve(templatePath, './styles_')).on('data', (data) => {
                const templateOptions = {
                    stylesExtension: options.cmd.style
                };
                const compiledTemplate = ejs.render(data.toString(), templateOptions);

                if (options.cmd.style === 'sass')
                    fs.createWriteStream(path.join(sourcePath, './styles.sass')).write(compiledTemplate);
                else if (options.cmd.style === 'scss')
                    fs.createWriteStream(path.join(sourcePath, './styles.scss')).write(compiledTemplate);
                else if (options.cmd.style === 'less')
                    fs.createWriteStream(path.join(sourcePath, './styles.less')).write(compiledTemplate);
                else if (options.cmd.style === 'styl')
                    fs.createWriteStream(path.join(sourcePath, './styles.styl')).write(compiledTemplate);
                else
                    fs.createWriteStream(path.join(sourcePath, './styles.css')).write(compiledTemplate);
            });

            if (options.cmd.redux) {
                fs.createReadStream(path.resolve(templatePath, './actions_')).on('data', (data) => {
                    const templateOptions = {
                        componentNameLower: options.name.toLowerCase(),
                        componentNameTitle: common.toTitleCase(options.name)
                    };
                    const compiledTemplate = ejs.render(data.toString(), templateOptions);

                    fs.createWriteStream(path.join(sourcePath, `./app.actions.js`))
                        .write(compiledTemplate);
                });

                fs.createReadStream(path.resolve(templatePath, './reducers_')).on('data', (data) => {
                    const templateOptions = {
                        componentNameLower: options.name.toLowerCase(),
                        componentNameTitle: common.toTitleCase(options.name)
                    };
                    const compiledTemplate = ejs.render(data.toString(), templateOptions);

                    fs.createWriteStream(path.join(sourcePath, `./app.reducers.js`))
                        .write(compiledTemplate);
                });
            }
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
                            localConfig.options.dependencyManager : null;
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
