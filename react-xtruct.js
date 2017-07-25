'use strict';

const path = require('path');
const chalk = require('chalk');
const program = require('commander');
const commands = require('./commands');

program
    .version(chalk.green('0.0.15'));

program
    .command('new <type> [name]')
    .description('Creates new project or library')
    .option('--style <style>', 'What cascading style to use in your project')
    .option('-sd, --skip-dependencies', 'Skips the installation of the project\'s yarn or npm dependencies')
    .action((type, name, options) => {
        if (type.toLowerCase() === 'project') {
            console.log(chalk.green(`Creating new ${type} "${name || path.basename(process.cwd())}"...`));

            commands.new.project(Object.assign({}, {type, name}, {cmd: options}), (error, data) => {
                if (error)
                    return console.log(`new ${chalk.red(error)}`);

                console.log(`${chalk.green(data)}`);
            });
        }
    });

program
    .command('generate <type> <name>')
    .description('Creates new component for project or library')
    .alias('g')
    .action((type, name, options) => {
        if (type.toLowerCase() === 'component') {
            commands.generate.component(Object.assign({}, {type, name}, {cmd: options}), (error, data) => {
                if (error)
                    return console.log(`generate ${chalk.red(error)}`);

                console.log(`${chalk.green(data)}`);
            });
        }
    });

program
    .command('build')
    .description('Builds project or library')
    .alias('b')
    .option('-e, --environment <env>', 'Which environment to build')
    .action((options) => {
        commands.build.run(Object.assign({}, {cmd: options}), (error, data) => {
            if (error)
                return console.log(`build ${chalk.red(error)}`);

            console.log(`${chalk.green('Build done successful!')}`);
        });
    });

program
    .command('serve')
    .description('Serves project or library')
    .option('-p, --port <port>', 'Which port to use to serve')
    .option('-e, --environment <env>', 'Which environment to serve')
    .alias('s')
    .action((options) => {
        commands.serve.run(Object.assign({}, {cmd: options}), (error, data) => {
            if (error)
                return console.log(`serve ${chalk.red(error)}`);

            console.log(`${chalk.green(data)}`);
        });
    });

program
    .command('lint')
    .description('Lints the project or library')
    .alias('l')
    .action((options) => {
        commands.lint.run(options, (error, data) => {
            if (error)
                return console.log(`lint ${chalk.red(error)}`);

            console.log(`${chalk.green('Lint done successful!')}`);
        });
    });

program
    .command('test')
    .description('Test the project or library')
    .alias('t')
    .action((options) => {
        commands.test.run(options, (error, data) => {
            if (error)
                return console.log(`test ${chalk.red(error)}`);

            console.log(`${chalk.green('Test done successful!')}`);
        });
    });

program
    .command('set [option]')
    .description('Test the project or library')
    .option('-g, --global', 'Which port to use to serve')
    .action((options) => {
        commands.set.run(options, (error, data) => {
            if (error)
                return console.log(`set ${chalk.red(error)}`);

            console.log(`${chalk.green(data)}`);
        });
    });

program
    .parse(process.argv);