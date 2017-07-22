# react-xtruct [BETA]
> A simple cli to create a react project, generate components, run test, build and serve.  The cli is based on proven technologies like webpack, babel, an more.

## Prerequisites
+ Open a `command line` to run the commands below

## Installing
Using npm you can install react-xtruct
+ `npm i -g react-xtruct`

## Help
To learn more about the cli, type:
+ `rx --help`

## Creating New Project (creates structure, sets git repo and installs dependencies for the project.  ready to run.)
To create a new project in an already existent directory:
+ `rx new project`

To create a new project with a root directory:
+ `rx new project NAME`

## Generate Component
To generate a new component in your project (this will create a component, spec and styles):
+ `rx generate component NAME` or `rx g component NAME`

## Build Project
To build your project:
+ `rx build` or `rx b`

## Serve Project
To serve your project:
+ `rx serve` or `rx s`

To serve your project in a specific port (default port is 8080)
+ `rx s --port 8700` or `rx s -p 8700`

## Comming Soon
+ Lint your project
+ Test your project
+ Many more options for the commands above
+ Many more loaders for different resources (Images, CSS Modules, Sass, Less, Files, etc)
+ And much more!