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
    .command('serve')
    .description('Serves project or library')
    .option("-e, --environment <env>", "Which environment to serve")
    .action((options) => {
        commands.serve(options);
    });

program
    .command('build')
    .description('Builds project or library')
    .option("-e, --environment <env>", "Which environment to build")
    .action((options) => {
        commands.build(options);
    });

program
    .parse(process.argv);