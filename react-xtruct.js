'use strict';

const path = require('path');
const chalk = require('chalk');
const program = require('commander');
const commands = require('./commands');
const common = require('./commands/common');
const dependencyManager = common.getDependencyManager(process.cwd());
const version = '0.2.5';

commands.check.version({dependencyManager, package: 'react-xtruct'}, (error, data) => {
    if (error)
        return console.error(chalk.red(error));

    if (data !== version) {
        console.log(`${chalk.yellow('New react-xtruct version!')} 
        ${chalk.green('Please install the new version via npm or yarn.')}`);
    }

    program
        .version(chalk.green(version));

    program
        .command('docs')
        .description('Redirects you to react-xtruct\'s documentation')
        .action(() => {
            commands.docs.run({url: 'https://github.com/btinoco/react-xtruct/wiki'});
        });

    program
        .command('new <type> [name]')
        .description('Creates new project or library')
        .option('--style <style>', 'What cascading style to use in your project')
        .option('--router', 'Includes react-router library in your project')
        .option('--redux', 'Includes redux, react-redux and react-redux-router libraries in your project')
        .option('--skip-dependencies', 'Skips the installation of the project\'s yarn or npm dependencies')
        .action((type, name, options) => {
            if (type.toLowerCase() === 'project') {
                console.log(chalk.green(`Creating new ${type} "${name || path.basename(process.cwd())}"...`));

                commands.new.project(Object.assign({},
                    {type, name, version}, {cmd: options}), (error, data) => {
                    if (error)
                        return console.log(chalk.red(`${error}`));

                    console.log(chalk.green(`${data}`));
                });
            }
        });

    program
        .command('generate <type> <name>')
        .description('Creates new component for project or library')
        .alias('g')
        .action((type, name, options) => {
            if (!common.readLocalConfig(process.cwd()))
                return preventCommandFromRunningIfNotProcessorDir();

            if (type.toLowerCase() === 'container') {
                console.log(chalk.green(`Generating container component "${name}"...`));

                commands.generate.container(Object.assign({}, {type, name}, {
                    cmd: options,
                    path: process.cwd()
                }), (error, data) => {
                    if (error)
                        return console.log(chalk.red(`${error}`));

                    console.log(chalk.green(`${data}`));
                });
            } else {
                console.log(chalk.green(`Generating component "${name}"...`));

                commands.generate.component(Object.assign({}, {type, name}, {
                    cmd: options,
                    path: process.cwd()
                }), (error, data) => {
                    if (error)
                        return console.log(chalk.red(`${error}`));

                    console.log(chalk.green(`${data}`));
                });
            }
        });

    program
        .command('build')
        .description('Builds project or library')
        .alias('b')
        .option('-e, --environment <env>', 'Which environment to build')
        .action((options) => {
            if (!common.readLocalConfig(process.cwd()))
                return preventCommandFromRunningIfNotProcessorDir();

            commands.build.run(Object.assign({}, {cmd: options}), (error, data) => {
                if (error)
                    return console.log(chalk.red(`${error}`));

                console.log(chalk.green(`Build done successful!`));
            });
        });

    program
        .command('serve')
        .description('Serves project or library')
        .option('-p, --port <port>', 'Which port to use to serve')
        .option('-e, --environment <env>', 'Which environment to serve')
        .alias('s')
        .alias('server')
        .action((options) => {
            if (!common.readLocalConfig(process.cwd()))
                return preventCommandFromRunningIfNotProcessorDir();

            commands.serve.run(Object.assign({}, {cmd: options}), (error, data) => {
                if (error)
                    return console.log(chalk.red(`${error}`));

                console.log(chalk.green(`${data}`));
            });
        });

    program
        .command('lint')
        .description('Lints the project or library')
        .alias('l')
        .action((options) => {
            if (!common.readLocalConfig(process.cwd()))
                return preventCommandFromRunningIfNotProcessorDir();

            commands.lint.run(options, (error, data) => {
                if (error)
                    return console.log(chalk.red(`${error}`));

                if (data === 0)
                    console.log(chalk.green(`Lint done successful!`));
            });
        });

    program
        .command('test')
        .description('Test the project or library')
        .alias('t')
        .action((options) => {
            if (!common.readLocalConfig(process.cwd()))
                return preventCommandFromRunningIfNotProcessorDir();

            commands.test.run(options, (error, data) => {
                if (error)
                    return console.log(chalk.red(`${error}`));

                console.log(chalk.green(`Test done successful!`));
            });
        });

    program
        .command('eject')
        .description('Ejects the project from within the react-xtruct cli, this action is irreversible!')
        .action((keyValue, options) => {
            commands.eject.run(options, (error, data) => {
                if (error)
                    return console.log(chalk.red(`${error}`));

                console.log(chalk.green(`Test done successful!`));
            });
        });

    program
        .command('set <keyValue>')
        .description('Sets config key-values for the project or library')
        .option('-g, --global', 'To make the key-value global')
        .action((keyValue, options) => {
            commands.set.run(Object.assign({}, {keyValue}, {cmd: options}), (error, data) => {
                if (error)
                    return console.log(chalk.red(`${error}`));

                console.log(chalk.green(`${data}`));
            });
        });

    program
        .command('system')
        .description('Gets your system information for troubleshooting')
        .action(() => {
            console.log(chalk.green(`{System information: ${JSON.stringify(common.getSystemInfo())}}`));
        });

    program
        .parse(process.argv);

    function preventCommandFromRunningIfNotProcessorDir() {
        console.log(chalk.red('Directory is not a react-xtruct project.') +
            chalk.red('\nRun') + chalk.green(' rx new project') + chalk.red(' or ') +
            chalk.green('rx new project NAME') +
            chalk.red(' to create an react-xtruct project or cd to a react-xtruct project'));
    }

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
});
