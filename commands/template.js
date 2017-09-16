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
            let compiledTemplate;
            const templateFile = fs.readFileSync(path.join(options.templateDirectory, options.templateFilename),
                {encoding: 'utf-8'});

            if (options.templateOptions) {
                compiledTemplate = ejs.render(templateFile, options.templateOptions);
            }

            fs.writeFileSync(path.join(options.outputPath, options.outputFilename), compiledTemplate);

            console.log(`- ${chalk.blue(path.join(options.outputPath, options.outputFilename))} ${chalk.green('created successfully')}.`);
        } catch (e) {
            console.log(chalk.red(`Template compiling file ${options.templateFilename} failed, ${e}`));
        }
    }

    static compileCSS(options) {
        let styleFilename = 'style.css';

        if (options.style === 'sass')
            styleFilename = 'styles.sass';
        else if (options.style === 'scss')
            styleFilename = 'styles.scss';
        else if (options.style === 'less')
            styleFilename = 'styles.less';
        else if (options.style === 'styl')
            styleFilename = 'styles.styl';

        this.compile({
            templateDirectory: options.templateDirectory,
            templateFilename: options.templateFilename,
            templateOptions: {
                stylesExtension: options.style
            },
            outputFilename: styleFilename,
            outputPath: options.outputPath
        });
    }

    static compileImage(options) {
        try {
            const templateFile = fs.readFileSync(path.join(options.templateDirectory, options.templateFilename));

            fs.writeFileSync(path.join(options.outputPath, options.outputFilename), templateFile, {encoding: 'base64'});

            console.log(`- ${chalk.blue(path.join(options.outputPath, options.outputFilename))} ${chalk.green('created successfully')}.`);
        } catch (e) {
            console.log(chalk.red(`Template compiling image ${options.templateFilename} failed, ${e}`));
        }
    }
}

module.exports = Template;
