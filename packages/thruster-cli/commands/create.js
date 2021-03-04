const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const os = require('os');
const path = require('path');
const spawn = require('cross-spawn');
const fs = require('fs-extra');
const thruster = require('thruster');

const { checkThatNpmCanReadCwd, checkAppName } = require('../utils');

let projectName;
let root;
/**
 *
 * @param {string} appName project name
 * @param {string} type [local|git|npm|thruster]
 * @param {object} options { url: string, root: string, package: string, path: string }
 */
async function create(appName, type, options) {
  console.log(appName, type, options);

  if (!checkAppName(appName)) {
    process.exit(1);
  }
  if (!checkThatNpmCanReadCwd()) {
    process.exit(1);
  }

  projectName = appName;
  root = path.resolve(appName);
  let template;

  fs.ensureDirSync(root);
  initProject();

  switch (type) {
    case 'git':
      const { url } = options;
      template = await loadGitTemplate(url);
      break;
    case 'npm':
      const { package } = options;
      template = await loadNpmTemplate(package);
      break;
    case 'local':
      const { path: templatePath } = options;
      template = templatePath;
      break;
    default:
      console.log(chalk.red('please using a valid type for create project.'));
      console.log();
  }

  await loadTemplate(template);
}

async function initProject() {
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    private: true,
  };
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson, null, 2) + os.EOL);
}

async function loadGitTemplate(url) {
  console.log('temp directory:', chalk.yellow(path.join(os.tmpdir(), 'thruster', projectName)));
  const spinner = ora(`downing template from git(${url})...`).start();
  download(url, path.join(os.tmpdir(), 'thruster', projectName), (err) => {
    if (err) {
      console.log(chalk.red('Error: ' + err.message));
      console.log(chalk.red('Download failed. Please confirm your git repository URL.'));
      spinner.fail();
      return;
    }
    spinner.text = 'downing template from git succeed.';
    spinner.succeed();
    return path.join(os.tmpdir(), 'thruster', projectName);
  });
}

async function loadNpmTemplate(npmPackageName) {
  const spinner = ora(`start installing template package(${npmPackageName})...`).start();

  let command = 'npm';
  let args = ['install', '--save', '--save-exact', '--loglevel', 'error'].concat(npmPackageName);

  // NOTE: specific path
  args.push('--cwd');
  args.push(root);

  const code = spawn.sync(command, args, { stdio: 'inherit' });
  if (code !== 0) {
    console.log();
    console.log('Aborting installation.');
    console.log(`  ${chalk.cyan(command + args.join(' '))} has failed.`);
    console.log();
    spinner.fail();
    return;
  }
  spinner.text = `installing template package(${npmPackageName}) succeed.`;
  spinner.succeed();
  return path.join(root, 'node_modules', npmPackageName);
}

async function loadTemplate(template) {
  thruster.init(template);
}

module.exports = {
  create,
};
