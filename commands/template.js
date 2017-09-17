'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ejs = require('ejs');

class Template {
    constructor() {
    }

    static compile(options) {
        try {
            let compiledTemplate = fs.readFileSync(path.resolve(options.templateDirectory, options.templateFilename),
                {encoding: 'utf-8'});

            if (options.templateOptions) {
                compiledTemplate = ejs.render(compiledTemplate, options.templateOptions);
            }

            fs.writeFileSync(path.resolve(options.outputPath, options.outputFilename), compiledTemplate);
        } catch (e) {
            console.log(chalk.red(`Template compiling file ${options.templateFilename} failed, ${e}`));
        }
    }

    static compileCSS(options) {
        let styleExtension = 'css';

        if (options.style === 'sass')
            styleExtension = 'sass';
        else if (options.style === 'scss')
            styleExtension = 'scss';
        else if (options.style === 'less')
            styleExtension = 'less';
        else if (options.style === 'styl')
            styleExtension = 'styl';

        this.compile({
            templateDirectory: options.templateDirectory,
            templateFilename: options.templateFilename,
            templateOptions: {
                stylesExtension: options.style
            },
            outputFilename: `${options.outputFilename}.${styleExtension}`,
            outputPath: options.outputPath
        });
    }

    static compileImage(options) {
        try {
            const templateFile = fs.readFileSync(path.resolve(options.templateDirectory, options.templateFilename));

            fs.writeFileSync(path.resolve(options.outputPath, options.outputFilename), templateFile, {encoding: 'base64'});
        } catch (e) {
            console.log(chalk.red(`Template compiling image ${options.templateFilename} failed, ${e}`));
        }
    }
}

module.exports = Template;
