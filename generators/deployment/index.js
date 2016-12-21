const Generator = require('yeoman-generator');
const yarnInstall = require('yarn-install');

class LoopbackGenerator extends Generator {
  prompting() {
    const config = this.fs.readJSON(this.destinationPath('package.json'));
    return this.prompt([
      {
        type    : 'input',
        name    : 'appName',
        message : 'Your application name',
        default : config.name,
      },
      {
        type    : 'input',
        name    : 'repositoryUrl',
        message : 'Your git repository URL',
        default : '',
      },
      {
        type    : 'input',
        name    : 'stagingUrl',
        message : 'Your staging url',
        default : '',
      },
      {
        type    : 'input',
        name    : 'prodUrl',
        message : 'Your production url',
        default : '',
      },
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  install() {
    yarnInstall([
      'shipit-cli',
      'shipit-deploy',
    ], {
      dev: true,
      cwd: this.destinationRoot(),
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**/shipitfile.js'),
      this.destinationPath(''),
      this.answers
    );
  }

};

module.exports = LoopbackGenerator;
