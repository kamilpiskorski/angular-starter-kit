# angular-starter-kit

> Starter Kit based on [Angular CLI](https://github.com/angular/angular-cli) (version 9.0.6) with custom folder structure includes some basic code like auth and form module

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Folder structure
    .
    ├── e2e
    ├── dist                                                    # Compiled files
    └── src                                                     # Source files
         ├── app
         │    ├── data
         │    │    ├── [+] modelss
         │    │    └── [+] services
         │    ├── layouts
         │    │    └── [layout name]
         │    ├── libs
         │    │    └── [lib name]
         │    ├── modules
         │    │    └── [module name]
         │    │         ├── [+] components
         │    │         ├── [+] directives
         │    │         ├── [+] pages
         │    │         ├── [module name]-routing.module.ts
         │    │         └── [module name].module.ts 
         │    └── shared
         │         ├── [+] components
         │         ├── [+] directives
         │         └── [+] pipes
         ├── [+] assets
         ├── [+] enviroments
         ├── [+] styles
         └── index.html
