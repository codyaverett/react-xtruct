'use strict';

const mkdirp = require('mkdirp');
const path = require('path');
const repository = require('./repository');
const generate = require('./generate');
const install = require('./install');
const template = require('./template');
const common = require('./common');

class New {
    constructor() {
    }

    static project(options, callback) {
        try {
            let projectPath;
            let projectName;
            let projectSourcePath;
            let projectOptions;

            if (options.name) {
                projectPath = path.resolve(process.cwd(), options.name);
                projectName = common.getFilenameFromPath(projectPath);
            } else {
                projectPath = process.cwd();
                projectName = path.basename(process.cwd());
            }

            options.cmd.style = options.cmd.style || 'css';

            projectOptions = {
                name: projectName,
                path: projectPath,
                cmd: options.cmd
            };

            mkdirp.sync(projectOptions.path);

            this.createProjectDirectoryFiles(projectOptions);

            const rootDirectory = common.readLocalConfig(projectOptions.path).project.root;

            projectSourcePath = path.join(projectPath, rootDirectory);

            projectOptions.source = projectSourcePath;

            this.createSourceDirectoryAndFiles(projectOptions);

            if (options.cmd.redux) {
                generate.container({
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
            } else {
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
            }
        } catch (e) {
            callback(`New project creation failed, ${e}`, null);
        }
    }

    static createProjectDirectoryFiles(options) {
        const templatePath = path.resolve(__dirname, './../templates/project');

        template.compile({
            templateDirectory: templatePath,
            templateFilename: 'react-xtruct_',
            templateOptions: {
                appName: options.name,
                appStyles: options.cmd.style,
                redux: options.cmd.redux,
                router: options.cmd.router
            },
            outputFilename: 'react-xtruct.json',
            outputPath: options.path
        });

        template.compile({
            templateDirectory: templatePath,
            templateFilename: 'index_',
            templateOptions: {
                appTitle: options.name
            },
            outputFilename: 'index.html',
            outputPath: options.path
        });

        template.compile({
            templateDirectory: templatePath,
            templateFilename: 'gitignore_',
            outputFilename: '.gitignore',
            outputPath: options.path
        });

        template.compile({
            templateDirectory: templatePath,
            templateFilename: 'package_',
            templateOptions: {
                appName: options.name,
                appRepo: options.name,
                router: options.cmd.router,
                redux: options.cmd.redux
            },
            outputFilename: 'package.json',
            outputPath: options.path
        });

        template.compile({
            templateDirectory: templatePath,
            templateFilename: 'readme_',
            templateOptions: {
                appName: options.name,
                appVersion: options.version
            },
            outputFilename: 'readme.md',
            outputPath: options.path
        });

        template.compile({
            templateDirectory: templatePath,
            templateFilename: 'editorconfig_',
            outputFilename: '.editorconfig',
            outputPath: options.path
        });

        template.compile({
            templateDirectory: templatePath,
            templateFilename: 'eslintrc_',
            outputFilename: '.eslintrc.js',
            outputPath: options.path
        });
    }

    static createSourceDirectoryAndFiles(options) {
        const templatePath = path.resolve(__dirname, './../templates/source');
        const assetsPath = path.resolve(__dirname, './../templates/assets');
        const sourceAssetsPath = path.resolve(options.source, 'assets');

        mkdirp.sync(options.source);
        mkdirp.sync(sourceAssetsPath);

        template.compileImage({
            templateDirectory: assetsPath,
            templateFilename: 'react-xtruct-logo.png',
            outputFilename: 'react-xtruct-logo.png',
            outputPath: sourceAssetsPath,
        });

        template.compile({
            templateDirectory: templatePath,
            templateFilename: 'index_',
            templateOptions: {
                redux: options.cmd.redux,
                stylesExtension: options.cmd.style
            },
            outputFilename: 'index.jsx',
            outputPath: options.source
        });

        template.compile({
            templateDirectory: templatePath,
            templateFilename: 'app_',
            templateOptions: {
                router: options.cmd.router
            },
            outputFilename: 'app.jsx',
            outputPath: options.source
        });

        template.compileCSS({
            style: options.cmd.style,
            templateDirectory: templatePath,
            templateFilename: 'styles_',
            outputFilename: 'app',
            outputPath: options.source
        });

        if (options.cmd.redux) {
            template.compile({
                templateDirectory: templatePath,
                templateFilename: 'actions_',
                templateOptions: {
                    componentNameLower: options.name.toLowerCase(),
                    componentNameTitle: common.toTitleCase(options.name)
                },
                outputFilename: 'actions.js',
                outputPath: options.source
            });

            template.compile({
                templateDirectory: templatePath,
                templateFilename: 'reducers_',
                templateOptions: {
                    componentNameLower: options.name.toLowerCase(),
                    componentNameTitle: common.toTitleCase(options.name)
                },
                outputFilename: 'reducers.js',
                outputPath: options.source
            });
        }
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
                        const dependencyManager = common.getDependencyManager(options.path);

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
