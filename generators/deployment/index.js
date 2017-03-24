const Generator = require('yeoman-generator');

class LoopbackGenerator extends Generator {
  prompting() {
    const config = this.fs.readJSON(this.destinationPath('package.json'));
    return this.prompt([
      {
        type    : 'input',
        name    : 'appName',
        message : 'Your application name',
        default : config.name,
        store   : true
      },
      {
        type    : 'input',
        name    : 'repositoryUrl',
        message : 'Your git repository URL',
        default : '',
        store   : true
      },
      {
        type    : 'input',
        name    : 'stagingUrl',
        message : 'Your staging url',
        default : '',
        store   : true
      },
      {
        type    : 'input',
        name    : 'prodUrl',
        message : 'Your production url',
        default : '',
        store   : true
      },
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  install() {
    this.npmInstall([
      'shipit-cli',
      'shipit-deploy'
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

    this.fs.copyTpl(
      this.templatePath('**/*.md'),
      this.destinationPath(''),
      this.answers
    );
  }

};

module.exports = LoopbackGenerator;
