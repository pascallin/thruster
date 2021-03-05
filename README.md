# thruster

<p align="center">
  <img width="200" height="200" src="./icon.svg">
</p>

For better experience creating a npm package as a project template

## How to use?

### build a template

1. create your own Node.js project template

2. add configuration file

```shell
touch .thruster.json
```

3. publish template project

You can push git repository or publish it to npm registry.

### create project with thruster

1. install thruster-cli

```shell
npm install -g thruster-cli
```

2. create project

You can create project from npm registry or remote git repository

```shell
thruster-cli create <project name> --from npm -r deco-brick-template
```

```shell
thruster-cli create <project name> --from git -r https://github.com/pascallin/deco-brick-cli#template
```

```shell
thruster-cli create <project name> --from local -r <absolute path in localhost>
```

## thruster template configuration

- **templatePath**, will copy whole folder as work directory
- **ignore**, it will not copy from template folder. There are some default ignore files, check docs.
- **extra**, it will merge to package.json, please ensure dependencies and devDependencies was in here if your template package needed.
