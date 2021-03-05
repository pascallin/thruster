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
npm install -g @thruster/cli
```

2. create project

You can create project from npm registry or remote git repository

```shell
thruster create --from git --resource <git host>:<user name>/<repository>#<branch> --path [relative path] <project name>
# example: thruster create --from git --resource https://github.com:pascallin/thruster#main --path examples/cra-template testproj
```

```shell
thruster create --from local --resource <absolute path in localhost> <project name>
# example: thruster create --from local --resource ~/Development/pascal-github/thruster --path examples/cra-template testproj
```

## Use case

### Examples

suppose you have a git repository like

```shell
.
├──examples
|   ├──examples-template
|     |── ...
├──src
│   |── ...
├── package.json
|── ...
```

you can add thruster a `.thruster.json` to your examples, and then you can quickly start a specific example.

### Basic Template

suppose you want to create a react front-end project as a template, you can create a github repository and add thruster to it.

## thruster template configuration

- **templatePath**, will copy whole folder as work directory
- **ignore**, it will not copy from template folder. There are some default ignore files, check docs.
- **extra**, it will merge to package.json, please ensure dependencies and devDependencies was in here if your template package needed.

## TODO:

- [ ] npm resource support
- [ ] manage template in localhost machine
