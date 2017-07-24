# react-xtruct BETA
> An intuitive, simplified cli to create a react project, generate components, run test, build and serve.  The cli is based on proven technologies like webpack, babel, an more.

__If you like this project, help contribute here:  [Github](https://github.com/btinoco/react-xtruct)__.  This project is in __beta__.

## Prerequisites
+ Open a `command line` to run the commands below

## Installing
Using npm you can install react-xtruct
+ `npm i -g react-xtruct`

## Help
To learn more about the cli, type:
+ `rx --help`

## Create New Project (creates structure, sets git repo and installs dependencies for the project)
To create a new project in an already existent directory:
+ `rx new project`

To create a new project with a root directory:
+ `rx new project NAME`

To create a new project using sass (by default the project uses `css`):
+ `rx new project NAME --style scss`

To create a new project without installing the project's dependencies:
+ `rx new project NAME -sd` or `rx new project NAME --skip-dependencies`

## Generate Component
To generate a new component in your project (this will create a component, spec and styles):
+ `rx generate component NAME` or `rx g component NAME`

## Lint Project
To lint your project:
+ `rx lint` or `rx l`

## Build Project
To build your project:
+ `rx build` or `rx b`

## Serve Project
To serve your project:
+ `rx serve` or `rx s`

To serve your project using a specific port (default port is `8080`)
+ `rx s --port 8700` or `rx s -p 8700`

## Comming Soon
+ Test your project
+ CSS modules with sass and less
+ Many more options for the commands above
+ Project with react-router and react-redux
+ And much more!