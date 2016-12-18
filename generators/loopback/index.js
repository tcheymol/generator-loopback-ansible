const Generator = require('yeoman-generator');
const yarnInstall = require('yarn-install');

class LoopbackGenerator extends Generator {
  prompting() {
    const config = this.fs.readJSON(this.destinationPath('package.json'));
    return this.prompt([{
      type    : 'input',
      name    : 'appName',
      message : 'Your application name',
      default : config.name,
    }]).then((answers) => {
      this.answers = answers;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**/*.js'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/*.json'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/*.sql'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/*.html'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/yarn.lock'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/pm2.yml'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/.gitignore'),
      this.destinationPath(''),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('**/.eslintrc'),
      this.destinationPath(''),
      this.answers
    );
  }

};

module.exports = LoopbackGenerator;
