'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ejs = require('ejs');
const common = require('../libs/common');

class Template {
    constructor() {
    }

    static compile(options) {
        try {
            let compiledTemplate;
            const templateFile = fs.readFileSync(path.join(options.templateDirectory, options.templateFilename),
                {encoding: 'utf-8'});

            if (options.templateOptions) {
                compiledTemplate = ejs.render(templateFile, options.templateOptions);
            }

            if (options.binary)
                fs.writeFileSync(path.join(options.outputPath, options.outputFilename), compiledTemplate,
                    {encoding: 'base64'});
            else
                fs.writeFileSync(path.join(options.outputPath, options.outputFilename), compiledTemplate);

            console.log(chalk.green(`- ${path.join(options.outputPath, options.outputFilename)} created successfully.`));
        } catch (e) {
            console.log(chalk.red(`Template compiling of ${options.templateFilename} failed, ${e}`));
        }
    }
}

module.exports = Template;
