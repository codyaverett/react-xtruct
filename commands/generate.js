'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class Generate {
    constructor() {

    }

    component(options, callback) {
        let projectPath;
        let componentPath;

        if (options.type.toLowerCase() === 'component') {
            projectPath = path.join(process.cwd(), `./src`);
            componentPath = path.join(projectPath, `./${options.name}`);

            fs.mkdir(componentPath, (error, data) => {
                if (error)
                    return console.warn(chalk.red(error));

                fs.createReadStream(path.resolve(__dirname, './../templates/component.jsx')).on('data', (data) => {
                    const data2String = data.toString();
                    let dataReplaced = data2String.replace(/xxNamexx/g, options.name.toLowerCase());

                    dataReplaced = dataReplaced.replace(/_XXNameXX_/g, this.toTitleCase(options.name));

                    fs.createWriteStream(path.join(componentPath, `./${options.name}.component.jsx`)).write(dataReplaced);
                });
                fs.createReadStream(path.resolve(__dirname, './../templates/spec.jsx')).on('data', (data) => {
                    const data2String = data.toString();
                    let dataReplaced = data2String.replace(/xxNamexx/g, options.name.toLowerCase());

                    dataReplaced = dataReplaced.replace(/_XXNameXX_/g, this.toTitleCase(options.name));

                    fs.createWriteStream(path.join(componentPath, `./${options.name}.component.spec.jsx`)).write(dataReplaced);
                });
                fs.createReadStream(path.resolve(__dirname, './../templates/styles.css')).on('data', (data) => {
                    const data2String = data.toString();
                    let dataReplaced = data2String.replace(/xxNamexx/g, options.name.toLowerCase());

                    dataReplaced = dataReplaced.replace(/_XXNameXX_/g, this.toTitleCase(options.name));

                    fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.css`)).write(dataReplaced);
                });

                callback(null, 'done');
            });
        }
    }

    toTitleCase(name) {
        const nameTemp = name.split(" ");

        for (let i = 0; i < nameTemp.length; i++) {
            let j = nameTemp[i].charAt(0).toUpperCase();

            nameTemp[i] = j + nameTemp[i].substr(1);
        }

        return nameTemp.join(" ");
    }
}

function generate(options, callback) {
    const gen = new Generate();

    if (options.type.toLowerCase() === 'component') {
        gen.component(options, callback);
    }
}

module.exports = generate;