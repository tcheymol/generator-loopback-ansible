var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.log('Deleting existing client directory');
    this.spawnCommandSync('rm', ['-rf', 'client']);
    this.log('Cloning react-redux-starter-kit');
    this.spawnCommandSync('git', [
      'clone',
      '--branch',
      'v3.0.0-alpha.2',
      'https://github.com/davezuko/react-redux-starter-kit.git',
      'client'
    ]);
    this.log('Updating project config to use webpack-dev-server');
    this.spawnCommandSync('rm', ['client/config/project.config.js']);
    this.fs.copyTpl(
      this.templatePath('**/*.js'),
      this.destinationPath(''),
      this.answers
    );
    this.log('Remove git history');
    this.spawnCommandSync('rm', ['-rf', 'client/.git']);
    this.log('Remove local client server');
    this.spawnCommandSync('rm', ['-rf', 'client/server']);
  }

  install() {
    this.log('Install client node_modules');
    this.destinationRoot('client')
    this.npmInstall()
  }
};
