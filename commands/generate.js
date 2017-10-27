'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const chalk = require('chalk');
const template = require('./template');
const common = require('./common');

class Generate {
    constructor() {
    }

    static component(options, callback) {
        try {
            const configs = common.readLocalConfig(options.path);
            const rootDirectory = configs.project.root;
            const style = options.cmd.style || configs.project.style;
            const router = options.cmd.router || configs.project.router;
            const templatePath = path.resolve(__dirname, './../templates/component');
            const projectPath = path.join(options.path, rootDirectory);
            const componentPath = path.join(projectPath, options.name);
            const componentName = common.getFilenameFromPath(options.name);
            let successfulMessage = 'Component generated successful!';

            mkdirp.sync(componentPath);

            template.compile({
                templateDirectory: templatePath,
                templateFilename: 'component_',
                templateOptions: {
                    componentNameLower: componentName.toLowerCase(),
                    componentNameTitle: common.toTitleCase(componentName),
                    stylesExtension: style.toLowerCase()
                },
                outputFilename: `${componentName}.jsx`,
                outputPath: componentPath
            });

            template.compile({
                templateDirectory: templatePath,
                templateFilename: 'spec_',
                templateOptions: {
                    componentNameLower: componentName.toLowerCase(),
                    componentNameTitle: common.toTitleCase(componentName)
                },
                outputFilename: `${componentName}.spec.jsx`,
                outputPath: componentPath
            });

            template.compileCSS({
                style: options.cmd.style,
                templateDirectory: templatePath,
                templateFilename: 'styles_',
                outputFilename: `${componentName}`,
                outputPath: componentPath
            });

            if (router) {
                successfulMessage = 'Component generated successful!\nPlease import the component\'s into' +
                    ' ./' + rootDirectory + '/app.component and add it to the router.';
            }

            callback(null, successfulMessage);
        } catch (e) {
            callback(`Component generate error, ${e}`, null);
        }
    }

    static container(options, callback) {
        try {
            const configs = common.readLocalConfig(options.path);
            const rootDirectory = configs.project.root;
            const style = options.cmd.style || configs.project.style;
            const redux = options.cmd.redux || configs.project.redux;
            const router = options.cmd.router || configs.project.router;
            const templatePath = path.resolve(__dirname, './../templates/component');
            const projectPath = path.join(options.path, rootDirectory);
            const componentPath = path.join(projectPath, options.name);
            const componentName = common.getFilenameFromPath(options.name);
            let successfulMessage = 'Component generated successful!';

            mkdirp.sync(componentPath);

            template.compile({
                templateDirectory: templatePath,
                templateFilename: 'container_',
                templateOptions: {
                    redux,
                    componentNameLower: componentName.toLowerCase(),
                    componentNameTitle: common.toTitleCase(componentName),
                    stylesExtension: style.toLowerCase()
                },
                outputFilename: `${componentName}.jsx`,
                outputPath: componentPath
            });

            template.compile({
                templateDirectory: templatePath,
                templateFilename: 'spec_',
                templateOptions: {
                    componentNameLower: componentName.toLowerCase(),
                    componentNameTitle: common.toTitleCase(componentName)
                },
                outputFilename: `${componentName}.spec.jsx`,
                outputPath: componentPath
            });

            template.compileCSS({
                style: options.cmd.style,
                templateDirectory: templatePath,
                templateFilename: 'styles_',
                outputFilename: `${componentName}`,
                outputPath: componentPath
            });

            if (redux) {
                template.compile({
                    templateDirectory: templatePath,
                    templateFilename: 'actions_',
                    templateOptions: {
                        componentNameLower: componentName.toLowerCase(),
                        componentNameTitle: common.toTitleCase(componentName)
                    },
                    outputFilename: `actions.js`,
                    outputPath: componentPath
                });

                template.compile({
                    templateDirectory: templatePath,
                    templateFilename: 'reducers_',
                    templateOptions: {
                        componentNameLower: componentName.toLowerCase()
                    },
                    outputFilename: `reducers.js`,
                    outputPath: componentPath
                });
            }

            if (redux && !router) {
                successfulMessage = 'Component generated successful!\nPlease import the component\'s ' +
                    'reducers into ./' + rootDirectory + '/app.reducers and add it to the reducers.';
            } else if (router && !redux) {
                successfulMessage = 'Component generated successful!\nPlease import the component\'s into' +
                    ' ./' + rootDirectory + '/app.component and add it to the router.';
            } else if (redux && router) {
                successfulMessage = 'Component generated successful!\nPlease import the component\'s reducers into' +
                    ' ./' + rootDirectory + '/app.reducers and add it to the reducers also into ./src/app.component and add it to the ' +
                    'router.';
            }

            callback(null, successfulMessage);
        } catch (e) {
            callback(`Container generate error, ${e}`, null);
        }
    }
}

module.exports = Generate;
