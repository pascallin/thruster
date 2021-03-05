const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const os = require('os');
const path = require('path');
const spawn = require('cross-spawn');
const fs = require('fs-extra');
const { Thruster } = require('@thruster/core');

const { checkThatNpmCanReadCwd, checkAppName, checkDir } = require('../utils');

let projectName;
let root;
/**
 *
 * @param {string} appName project name
 * @param {string} type [local|git|npm|thruster]
 * @param {object} options { url: string, root: string, package: string, path: string }
 */
async function create(appName, type, options) {
  if (!checkAppName(appName)) {
    process.exit(1);
  }
  if (!checkThatNpmCanReadCwd()) {
    process.exit(1);
  }

  projectName = appName;
  root = path.resolve(appName);
  let template;

  if (!checkDir(root)) {
    process.exit(1);
  }

  const { resource, path: templateRelativePath } = options;

  try {
    switch (type) {
      case 'git':
        template = await loadGitTemplate(resource, templateRelativePath);
        break;
      // case 'npm':
      //   template = await loadNpmTemplate(resource);
      //   break;
      case 'local':
        template = resource;
        if (templateRelativePath) {
          template = path.join(tempDir, templateRelativePath);
        }
        break;
      default:
        console.log(chalk.red('please using a valid type for create project.'));
        console.log();
        process.exit(1);
    }

    if (!template) {
      throw new Error('cannot load template!');
    }

    await loadTemplate(template);
  } catch (err) {
    console.log();
    console.log(chalk.red('Oops! something went wrong'));
    console.log(chalk.red('Error: ' + err.stack));
    console.log();
    fs.removeSync(root);
  } finally {
    // NOTE: remove temp git template if needed
    if (type == 'git') {
      fs.removeSync(path.join(os.tmpdir(), 'thruster'));
    }
    process.exit(1);
  }
}

async function loadGitTemplate(url, relativePath) {
  const tempDir = path.join(os.tmpdir(), 'thruster', projectName);
  console.log();
  console.log('downing to directory:', chalk.yellow(tempDir));
  console.log();
  const spinner = ora(`downing template from git(${url})...`).start();
  console.log();
  const downloadPromise = () =>
    new Promise((resolve, reject) => {
      download(url, tempDir, { clone: true }, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });

  try {
    await downloadPromise();
    spinner.text = 'downing template from git succeed.';
    spinner.succeed();
  } catch (err) {
    console.log(chalk.red('Error: ' + err.stack));
    console.log(chalk.red('Download failed. Please confirm your git repository URL.'));
    spinner.fail();
    fs.removeSync(tempDir);
  }

  if (relativePath) {
    return path.join(tempDir, relativePath);
  }
  return tempDir;
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

async function loadTemplate(templatePath) {
  console.log();
  const spinner = ora(`start execute thruster...`).start();
  console.log();
  console.log(
    chalk.yellow(
      JSON.stringify({
        projectName,
        templatePath,
        targetPath: root,
      }),
    ),
  );
  thruster = new Thruster({
    projectName,
    templatePath,
    targetPath: root,
  });
  try {
    await thruster.start();
    spinner.text = `execute thruster succeed.`;
    spinner.succeed();
  } catch (err) {
    spinner.text = `execute thruster failed.`;
    spinner.fail();

    console.log();
    console.log(chalk.red('Error: ' + err.message));
    console.log();
  }
  return;
}

module.exports = {
  create,
};
