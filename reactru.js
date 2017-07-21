'use strict';

const path = require('path');
const chalk = require('chalk');
const program = require('commander');
const commands = require('./commands');

program
    .version(chalk.green('0.0.1'));

program
    .command('new <type> [name]')
    .description('Creates new project or library')
    .action((type, name, options) => {
        commands.new({type, name});
    });

program
    .command('generate <type> <name>')
    .description('Creates new project or library')
    .alias('g')
    .action((type, name, options) => {
        commands.generate({type, name});
    });

program
    .command('serve')
    .description('Serves project or library')
    .option("-e, --environment <env>", "Which environment to serve")
    .alias('s')
    .action((options) => {
        commands.serve(options);
    });

program
    .command('build')
    .description('Builds project or library')
    .alias('b')
    .option("-e, --environment <env>", "Which environment to build")
    .action((options) => {
        commands.build(options);
    });

program
    .parse(process.argv);