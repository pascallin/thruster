const commander = require('commander');

const { list, add, remove, clean, create } = require('./commands');
const packageJson = require('./package.json');

function init() {
  const program = new commander.Command(packageJson.name).version(packageJson.version);

  // program.command("list")
  //   .description("list all template packages")
  //   .action(list);

  // program.command("add")
  //   .description("add template to thruster")
  //   .action(add);

  // program.command("remove")
  //   .description("remove specific thruster localhost template")
  //   .action(remove);

  // program.command("clean")
  //   .description("clean all thruster localhost templates")
  //   .action(clean);

  program
    .command('create <projectName>')
    .description('create a project base on specific thruster template')
    .option('--from <type>', 'get template from resource base on type: [local | git | npm | thruster]')
    .option('--resource <resource>', '[git repository URL | localhost template path]')
    .option('--path [path]', 'template path from resource')
    .action(async (name, options) => {
      await create(name, options.from, options);
    });

  program.parse(process.argv);
}

module.exports = {
  init,
};
