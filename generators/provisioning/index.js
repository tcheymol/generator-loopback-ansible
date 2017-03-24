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
        name    : 'stagingUrl',
        message : 'Your staging url',
        default : '',
        store   : true
      },
      {
        type    : 'input',
        name    : 'stagingDatabasePassword',
        message : 'Your staging database password',
        default : config.name,
        store   : true
      },
      {
        type    : 'input',
        name    : 'prodUrl',
        message : 'Your production url',
        default : '',
        store   : true
      },
      {
        type    : 'input',
        name    : 'prodDatabasePassword',
        message : 'Your production database password',
        default : config.name,
        store   : true
      }
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**/prod'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/staging'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/vagrant'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/Vagrantfile'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/*.yml'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/*.cfg'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copy(
      this.templatePath('**/roles/**'),
      this.destinationRoot()
    );

    this.fs.copyTpl(
      this.templatePath('**/*.md'),
      this.destinationPath(''),
      this.answers
    );
  }

};

module.exports = LoopbackGenerator;
