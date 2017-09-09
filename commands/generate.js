'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ejs = require('ejs');
const common = require('../libs/common');

class Generate {
    constructor() {
    }

    static component(options, callback) {
        const pathToComponentTemplates = path.resolve(__dirname, './../templates/component');
        const projectPath = options.path ? path.join(options.path, './src') : path.join(process.cwd(), './src');
        const componentPath = path.join(projectPath, `./${options.name}`);
        const style = options.cmd.style || common.readLocalConfig().project.style;
        const redux = options.cmd.redux || common.readLocalConfig().project.redux;
        const router = options.cmd.router || common.readLocalConfig().project.router;

        fs.mkdir(componentPath, (error, data) => {
            if (error)
                return callback(error, null);

            fs.createReadStream(path.resolve(pathToComponentTemplates, './component_')).on('data', (data) => {
                const templateOptions = {
                    redux,
                    componentNameLower: options.name.toLowerCase(),
                    componentNameTitle: common.toTitleCase(options.name),
                    stylesFileName: 'styles',
                    stylesExtension: style.toLowerCase()
                };
                const compiledTemplate = ejs.render(data.toString(), templateOptions);

                fs.createWriteStream(path.join(componentPath, `./${options.name}.component.jsx`))
                    .write(compiledTemplate);
            });

            fs.createReadStream(path.resolve(pathToComponentTemplates, './spec_')).on('data', (data) => {
                const templateOptions = {
                    componentNameLower: options.name.toLowerCase(),
                    componentNameTitle: common.toTitleCase(options.name)
                };
                const compiledTemplate = ejs.render(data.toString(), templateOptions);

                fs.createWriteStream(path.join(componentPath, `./${options.name}.component.spec.jsx`))
                    .write(compiledTemplate);
            });

            fs.createReadStream(path.resolve(pathToComponentTemplates, './styles_')).on('data', (data) => {
                const templateOptions = {
                    stylesExtension: style
                };
                const compiledTemplate = ejs.render(data.toString(), templateOptions);

                if (style === 'sass')
                    fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.sass`)).write(compiledTemplate);
                else if (style === 'scss')
                    fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.scss`)).write(compiledTemplate);
                else if (style === 'less')
                    fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.less`)).write(compiledTemplate);
                else if (style === 'styl')
                    fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.styl`)).write(compiledTemplate);
                else
                    fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.css`)).write(compiledTemplate);

            });

            if (redux) {
                fs.createReadStream(path.resolve(pathToComponentTemplates, './actions_')).on('data', (data) => {
                    const templateOptions = {
                        componentNameLower: options.name.toLowerCase(),
                        componentNameTitle: common.toTitleCase(options.name)
                    };
                    const compiledTemplate = ejs.render(data.toString(), templateOptions);

                    fs.createWriteStream(path.join(componentPath, `./${options.name}.actions.js`))
                        .write(compiledTemplate);
                });

                fs.createReadStream(path.resolve(pathToComponentTemplates, './reducers_')).on('data', (data) => {
                    const templateOptions = {
                        componentNameLower: options.name.toLowerCase()
                    };
                    const compiledTemplate = ejs.render(data.toString(), templateOptions);

                    fs.createWriteStream(path.join(componentPath, `./${options.name}.reducers.js`))
                        .write(compiledTemplate);
                });
            }

            if (redux) {
                callback(null, `Generated ${options.type} "${options.name}" successful!\nPlease import the component's reducers into ./src/app.reducers and add it to the reducers.`);
            } else if (router) {
                callback(null, `Generated ${options.type} "${options.name}" successful!\nPlease import the component's into ./src/app.component and add it to the router.`);
            } else if (redux && router) {
                callback(null, `Generated ${options.type} "${options.name}" successful!\nPlease import the component's reducers into ./src/app.reducers and add it to the reducers also into ./src/app.component and add it to the router.`);
            } else {
                callback(null, `Generated ${options.type} "${options.name}" successful!`);
            }
        });
    }
}

module.exports = Generate;
