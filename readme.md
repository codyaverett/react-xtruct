# react-tools [BETA - Proto]
> A simple cli to create a react project, generate components with specs and styles, run test, build and serve

# Prerequisites
+ Open a `command line` to run the commands below

# Installing
Using npm you can install react-tools
+ `npm i -g react-tools`

# Creating New Project (creates structure, sets git repo and installs dependencies for the project.  ready to run.)
To create a new project in an already existent directory:
+ `rts new project`

To create a new project with a root directory:
+ `rts new project NAME`

# Generate Component
To generate a new component in your project (this will create a component, spec and styles):
+ `rts generate component NAME` or `rts g component NAME`

# Build Project
To build your project:
+ `rts build` or `rts b`

# Serve Project
To serve your project:
+ `rts serve` or `rts s`

To serve your project in a specific port
+ `rts s --port 8700` or `rts s -p 8700`

# Comming Soon
+ Lint your project
+ Test your project
+ Options for the commands above
+ More loaders for different resources (Images, CSS Modules, Sass, Less, Files, etc)
+ And more!