'use strict';

const path = require('path');
const chalk = require('chalk');
const program = require('commander');
const commands = require('./commands');

program
    .version(chalk.green('0.0.10'));

program
    .command('new <type> [name]')
    .description('Creates new project or library')
    .option('--style <style>', 'What cascading style to use in your project')
    .option('-sd, --skip-dependencies', 'Skips the installation of the project\'s yarn or npm dependencies')
    .action((type, name, options) => {
        commands.new(Object.assign({}, {type, name}, {cmd: options}));
    });

program
    .command('generate <type> <name>')
    .description('Creates new component for project or library')
    .alias('g')
    .action((type, name, options) => {
        commands.generate(Object.assign({}, {type, name}, {cmd: options}), () => {
            console.log(chalk.green(`Generated ${type} "${name}" successful!`));
        });
    });

program
    .command('build')
    .description('Builds project or library')
    .alias('b')
    .option('-e, --environment <env>', 'Which environment to build')
    .action((options) => {
        commands.build(Object.assign({}, {cmd: options}), () => {
            console.log(chalk.green('Build project completed!'));
        });
    });

program
    .command('serve')
    .description('Serves project or library')
    .option('-p, --port <port>', 'Which port to use to serve')
    .option('-e, --environment <env>', 'Which environment to serve')
    .alias('s')
    .action((options) => {
        commands.serve(Object.assign({}, {cmd: options}), () => {
            console.log(chalk.green('Serve in progress...'));
        });
    });

program
    .command('lint')
    .description('Lints the project or library')
    .alias('l')
    .action((options) => {
        console.log(chalk.green('Linting command is not yet implemented!'));
    });

program
    .command('test')
    .description('Test the project or library')
    .alias('t')
    .action((options) => {
        console.log(chalk.green('Test command is not yet implemented!'));
    });

program
    .command('set [option]')
    .description('Test the project or library')
    .option('-g, --global', 'Which port to use to serve')
    .action((options) => {
        console.log(chalk.green('Set command is not yet implemented!'));
    });

program
    .parse(process.argv);