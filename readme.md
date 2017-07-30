# react-xtruct BETA
> An intuitive, simplified cli to create a react project, generate components, run test, build and serve.  The cli is based on proven technologies like webpack, babel, eslint, postcss, react and more.

##### This project is in __beta__.

##### __If you like this project, help contribute here:  [Github](https://github.com/btinoco/react-xtruct)__.

##### See the latest [Release Notes](https://github.com/btinoco/react-xtruct/releases)

##### See [react-xtruct Wiki](https://github.com/btinoco/react-xtruct/wiki)

## Prerequisites
+ Open a `command line` to run the commands below

## Installing
Using npm you can install react-xtruct
+ `npm i -g react-xtruct`

## Help
To learn more about the cli, type:
+ `rx --help`

## Create New Project
(creates structure, sets git repo and installs dependencies for the project)

To create a new project in an already existent directory:
+ `rx new project`

To create a new project with a root directory:
+ `rx new project NAME`

To create a new project using sass (by default the project uses `css` modules, supports: `sass`, `scss`, `less` and `stylus`):
+ `rx new project NAME --style scss`

To create a new project without installing the project's dependencies:
+ `rx new project NAME -sd` or `rx new project NAME --skip-dependencies`

To create a new project with router (Includes only the `react-router-dom v4` lib, the project needs to be manually set-up. __Automatic set-up coming soon__):
+ `rx new project NAME --router` or `rx new project --router`

To create a new project with redux (Includes only the `redux`, `react-redux` and `react-redux-router` libs, the project needs to be manually set-up. __Automatic set-up coming soon__):
+ `rx new project NAME --redux` or `rx new project --redux`

To create a new project with material (Includes only the `material-ui` lib, the project needs to be manually set-up. __Automatic set-up coming soon__):
+ `rx new project NAME --material` or `rx new project --material`

## Generate Component
To generate a new component in your project (this will create a component, spec and styles):
+ `rx generate component NAME` or `rx g component NAME`

## Lint Project
To lint your project:
+ `rx lint` or `rx l`

## Build Project
To build your project (Dev default):
+ `rx build` or `rx b`

To build your project (Prod):
+ `rx build -e prod` or `rx b -e prod`

## Serve Project
To serve your project(Dev default):
+ `rx serve` or `rx s`

To build your project (Prod):
+ `rx serve -e prod` or `rx s -e prod`

To serve your project using a specific port (default port is `8080`)
+ `rx s --port 8700` or `rx s -p 8700`

## Set Config
To set config local:
+ `rx set key=value` or `rx set key=value`

To set config global:
+ `rx set key=value --global` or `rx set key=value -g`

To set your project's dependency manager locally (default `npm`)
+ `rx set dependencyMananger=yarn` or `rx set dependencyMananger=npm`

To set your project's dependency manager globally (default `npm`)
+ `rx set dependencyMananger=yarn -g` or`rx set dependencyMananger=npm -g`

## Comming Soon
+ Test your project
+ CSS modules with sass and less
+ Many more options for the commands above
+ Create projects with react-router and react-redux and auto configuration
+ And much more!
