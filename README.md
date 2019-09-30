# angular-starter-kit

> Starter Kit based on [Angular CLI](https://angular.io/cli)

## Setup

#### 1. Generate project with Angular CLI

```bash
ng new [project-name] --commit=false --routing=true --style=scss
```

#### 2. Adding folder structure to `src`
    .
    ├── app
    
    └── src                 # Source files
         ├── assets
         │   ├── images
         │   └── ...
         ├── scripts
         │   └── app.js
         ├── styles
         │   └── app.scss
         └── index.html

#### 3. Set `stylePreprocessorOptions` in `angular.json`

```json
{
    "stylePreprocessorOptions": {
        "includePaths": ["src/styles"]
    }
}
```

#### 4. Set paths to `tsconfig.app.json`

```json
{
    "compilerOptions": {
        "paths": {
            "@app/*": ["src/app/*"],
            "@env/*": ["src/environments/*"]
        }
    }
}
```
