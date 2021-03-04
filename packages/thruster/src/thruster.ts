import fs from 'fs-extra';
import path from 'path';

interface ThrusterConfig {
  templatePath: string;
}

export class Thruster {
  private templatePath: string;
  constructor(config: ThrusterConfig) {
    const { templatePath } = config;
    this.templatePath = templatePath;
    fs.ensureFileSync(path.join(templatePath, '.thruster.json'));
    config = fs.readJsonSync(path.join(templatePath, '.thruster.json'));
    console.log(config);
  }
}
