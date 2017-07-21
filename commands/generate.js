'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class Generate {
    constructor() {

    }

    component(options) {
        let projectPath;
        let componentPath;

        if (options.type.toLowerCase() === 'component') {
            projectPath = path.join(process.cwd(), `./src`);
            componentPath = path.join(projectPath, `./${options.name}`);

            fs.mkdir(componentPath, (error, data) => {
                if (error)
                    return console.warn(chalk.red(error));

                fs.createReadStream(path.resolve(__dirname, './../templates/component.jsx')).pipe(fs.createWriteStream(path.join(componentPath, `./${options.name}.component.jsx`)));
                fs.createReadStream(path.resolve(__dirname, './../templates/spec.jsx')).pipe(fs.createWriteStream(path.join(componentPath, `./${options.name}.component.spec.jsx`)));
                fs.createReadStream(path.resolve(__dirname, './../templates/styles.css')).pipe(fs.createWriteStream(path.join(componentPath, `./${options.name}.styles.css`)));
            });
        }
    }
}

function generate(options) {
    const gen = new Generate();

    if (options.type.toLowerCase() === 'component') {
        gen.component(options);
    }
}

module.exports = generate;