# thruster

For better experience creating a npm package as a project template

## How to use?

### build a template

1. create your own Node.js project template

2. install thruster

```shell
npm install --save-dev thruster
# or
yarn add -D thruster
```

3. add configuration file

```shell
touch .thruster.json
```

4. publish template project

You can push git repository or publish it to npm registry.

### create project with thruster

1. install thruster-cli

```shell
npm install -g thruster-cli
```

2. create project

You can create project from npm registry or remote git repository

```shell
thruster-cli create <project name> --npm deco-brick-template
```

```shell
thruster-cli create <project name> --git https://github.com/pascallin/deco-brick-cli#template
```

### localhost thruster template packages management

You can also download template packages for quicker starting project and better management experience

```shell
thruster-cli list
thruster-cli add
thruster-cli remove <template name>
thruster-cli clean # remove all templates
```

Once you add template, you can install using template name

```shell
thruster-cli create <project name> -t <template name>[@version]
```

## thruster template lifecycle

