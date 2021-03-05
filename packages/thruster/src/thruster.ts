import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import R from "ramda";

export interface ThrusterOptions {
  projectName: string;
  templatePath: string;
  targetPath: string;
}

export interface ThrusterConfig {
  templatePath: string;
  ignore?: string[];
  extra?: { [key: string]: any };
}

const defaultIgnoreFilePattern = ['node_modules', '.thruster.json', 'package.json', '.npmignore'];
const errorLogFilePatterns = ['npm-debug.log', 'yarn-error.log', 'yarn-debug.log'];

export class Thruster {
  private options: ThrusterOptions;
  private config: ThrusterConfig;

  constructor(options: ThrusterOptions) {
    this.options = options;
    const { templatePath } = options;

    fs.ensureFileSync(path.join(templatePath, '.thruster.json'));
    this.config = fs.readJsonSync(path.join(templatePath, '.thruster.json'));
  }

  public async start(): Promise<void> {
    try {
      await this.createPackageJson();
      await this.copyTemplateFiles();
      return;
    } catch (err) {
      throw err;
    }
  }

  private async createPackageJson(): Promise<void> {
    let packageJson = {
      name: this.options.projectName,
      version: '0.1.0',
      private: true,
    };
    if (this.config.extra) {
      packageJson = R.mergeRight(packageJson, this.config.extra);
    }
    fs.writeFileSync(path.join(this.options.targetPath, 'package.json'), JSON.stringify(packageJson, null, 2) + os.EOL);
  }

  private async copyTemplateFiles(): Promise<void> {
    const filterFunc = (src: string, dest: string): boolean => {
      const allIgnoreFiles = defaultIgnoreFilePattern.concat(this.config.ignore || []).concat(errorLogFilePatterns);
      for (const ignore of allIgnoreFiles) {
        if (src.indexOf(ignore) > -1) {
          return false;
        }
      }
      return true;
    };
    fs.copySync(`${this.options.templatePath}/${this.config.templatePath}`, this.options.targetPath, {
      filter: filterFunc,
    });
  }
}
