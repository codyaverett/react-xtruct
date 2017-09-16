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
        const templatePath = path.resolve(__dirname, './../templates/component');
        const projectPath = options.path ? path.join(options.path, './src') : path.join(process.cwd(), './src');
        const componentPath = path.join(projectPath, options.name);
        const componentName = common.getFilenameFromPath(options.name);
        const style = options.cmd.style || common.readLocalConfig().project.style;
        const redux = options.cmd.redux || common.readLocalConfig().project.redux;
        const router = options.cmd.router || common.readLocalConfig().project.router;

        console.log(chalk.green(`Creating ${options.type} "${options.name}"...`));

        mkdirp(componentPath, (error, data) => {
            if (error)
                return callback(error, null);

            template.compile({
                templateDirectory: templatePath,
                templateFilename: 'component_',
                templateOptions: {
                    redux,
                    componentNameLower: componentName.toLowerCase(),
                    componentNameTitle: common.toTitleCase(componentName),
                    stylesFileName: 'styles',
                    stylesExtension: style.toLowerCase()
                },
                outputFilename: `${componentName}.component.jsx`,
                outputPath: componentPath
            });

            template.compile({
                templateDirectory: templatePath,
                templateFilename: 'spec_',
                templateOptions: {
                    componentNameLower: componentName.toLowerCase(),
                    componentNameTitle: common.toTitleCase(componentName)
                },
                outputFilename: `${componentName}.component.spec.jsx`,
                outputPath: componentPath
            });

            template.compileCSS({
                style: options.cmd.style,
                templateDirectory: templatePath,
                templateFilename: 'styles_',
                outputFilename: `${componentName}.styles`,
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
                    outputFilename: `${componentName}.actions.js`,
                    outputPath: componentPath
                });

                template.compile({
                    templateDirectory: templatePath,
                    templateFilename: 'reducers_',
                    templateOptions: {
                        componentNameLower: componentName.toLowerCase()
                    },
                    outputFilename: `${componentName}.reducers.js`,
                    outputPath: componentPath
                });
            }

            if (redux) {
                callback(null, `Component generated successful!\nPlease import the component's reducers into ./src/app.reducers and add it to the reducers.`);
            } else if (router) {
                callback(null, `Component generated successful!\nPlease import the component's into ./src/app.component and add it to the router.`);
            } else if (redux && router) {
                callback(null, `Component generated successful!\nPlease import the component's reducers into ./src/app.reducers and add it to the reducers also into ./src/app.component and add it to the router.`);
            } else {
                callback(null, `Component generated successful!`);
            }
        });
    }
}

module.exports = Generate;
