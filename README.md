# thruster

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
thruster-cli create <project name> --npm deco-brick-template
```

```shell
thruster-cli create <project name> --git https://github.com/pascallin/deco-brick-cli#template
```

## thruster template configuration

- **tempaltePath**, will copy whole folder as work directory
- **ignore**, it will not copy from template folder. There are some default ignore files, check docs.

### default ignore files

- .DS_Store'
- .git
- .gitattributes
- .gitignore
- .gitlab-ci.yml
- .hg
- .hgcheck
- .hgignore
- .idea'
- .npmignore
- .travis.yml
- docs
- LICENSE
- README.md
- mkdocs.yml
- Thumbs.db
- npm-debug.log
- yarn-error.log
- yarn-debug.log
