'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const common = require('./common');

class Generate {
    constructor() {
    }

    static component(options, callback) {
        const pathToComponentTemplates = path.resolve(__dirname, './../templates/component');
        const projectPath = options.projectPath ? path.join(options.projectPath, './src') : path.join(process.cwd(), './src');
        const componentPath = path.join(projectPath, `./${options.name}`);
        const style = options.style || common.config().project.styles;

        fs.mkdir(componentPath, (error, data) => {
            if (error)
                return callback(error, null);

            fs.createReadStream(path.resolve(pathToComponentTemplates, './component.jsx')).on('data', (data) => {
                const data2String = data.toString();
                let dataReplaced = data2String.replace(/xxNamexx/g, options.name.toLowerCase());

                dataReplaced = dataReplaced.replace(/_XXNameXX_/g, common.toTitleCase(options.name));

                fs.createWriteStream(path.join(componentPath, `./${options.name}.component.jsx`)).write(dataReplaced);
            });

            fs.createReadStream(path.resolve(pathToComponentTemplates, './spec.jsx')).on('data', (data) => {
                const data2String = data.toString();
                let dataReplaced = data2String.replace(/xxNamexx/g, options.name.toLowerCase());

                dataReplaced = dataReplaced.replace(/_XXNameXX_/g, common.toTitleCase(options.name));

                fs.createWriteStream(path.join(componentPath, `./${options.name}.component.spec.jsx`)).write(dataReplaced);
            });

            fs.createReadStream(path.resolve(pathToComponentTemplates, './styles.css')).on('data', (data) => {
                const data2String = data.toString();
                let dataReplaced = data2String.replace(/xxNamexx/g, options.name.toLowerCase());

                dataReplaced = dataReplaced.replace(/_XXNameXX_/g, common.toTitleCase(options.name));

                if (style === 'css')
                    fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.css`)).write(dataReplaced);
                else if (style === 'sass')
                    fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.sass`)).write(dataReplaced);
                else if (style === 'scss')
                    fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.scss`)).write(dataReplaced);
                else if (style === 'less')
                    fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.less`)).write(dataReplaced);
            });

            callback(null, `Generated ${options.type} "${options.name}" successful!`);
        });
    }
}

module.exports = Generate;