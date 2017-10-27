![react-xtruct](https://github.com/btinoco/react-xtruct/blob/master/images/react-xtruct-logo-small.png)
> An intuitive, simplified cli to create a react project, generate components, run test, build and serve.  The cli is based on proven technologies like webpack, babel, eslint, postcss, react and more.
It uses a flat folder structure to find your code faster, make you more productive and avoid repetition.

## This project is in __beta__.

##### __If you like this project, help contribute here:  [Github](https://github.com/btinoco/react-xtruct)__.

##### See the latest [Release Notes](https://github.com/btinoco/react-xtruct/releases)

##### See [react-xtruct Wiki](https://github.com/btinoco/react-xtruct/wiki)

## Prerequisites
+ Git
+ Npm or Yarn
+ Open a `command line` to run the commands below

## Installing
Using npm you can install react-xtruct
+ `npm i -g react-xtruct`

## Help
To learn more about the cli, type:
+ `rx --help`

## Docs
To see the cli docs, type:
+ `rx docs`

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

To create and setup a new project with router:
+ `rx new project NAME --router` or `rx new project --router`

To create and setup a new project with redux:
+ `rx new project NAME --redux` or `rx new project --redux`

To create and setup a new project with redux and router:
+ `rx new project NAME --redux --router` or `rx new project --redux --router`

## Generate Components
To generate a new (presentation) component in your project (component, spec and styles):
+ `rx generate component NAME` or `rx g component NAME`

To generate a new container (component) in your project (component, spec, styles and if using redux actions and reducers)
+ `rx generate container NAME` or `rx g container NAME`

To learn more about the difference between __presentation__ component vs __container__ component visit: [Presentation vs Container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

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

## Test Project
To test your project:
+ COMING SOON!

## Eject Project
To eject your project:
+ COMING SOON!

## System
To get your system information (node, npm, yarn and os)
+ `rx system`

## Set Config
To set config local:
+ `rx set key=value` or `rx set key=value`

To set config global:
+ `rx set key=value --global` or `rx set key=value -g`

To set your project's dependency manager locally (default `npm`)
+ `rx set dependencyMananger=yarn` or `rx set dependencyMananger=npm`

To set your project's dependency manager globally (default `npm`)
+ `rx set dependencyMananger=yarn -g` or`rx set dependencyMananger=npm -g`

## Coming Soon
+ Test your project
+ Many more options for the commands above
+ And much more!
