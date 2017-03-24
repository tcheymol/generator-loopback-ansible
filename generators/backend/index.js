const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.log('Using a yeoman generator for loopback inside this generator');
    this.spawnCommandSync('lb');
    this.log('Please provide some more information')
    return this.prompt([
      {
        type    : 'input',
        name    : 'appName',
        message : 'App name:',
        default : 'myApp',
        store   : true
      },
      {
        type    : 'input',
        name    : 'databaseName',
        message : 'Database name:',
        default : 'database',
        store   : true
      },
      {
        type    : 'input',
        name    : 'databaseUser',
        message : 'Database user:',
        default : 'postgres',
        store   : true
      },
      {
        type    : 'input',
        name    : 'databasePassword',
        message : 'Dev database password:',
        default : 'password',
        store   : true
      },
      {
        type    : 'input',
        name    : 'prodDatabasePassword',
        message : 'Your production database password',
        default : 'password',
        store   : true
      }
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  updateConfigToUseReactClient() {
    this.spawnCommandSync('rm', ['server/boot/root.js']);
    this.spawnCommandSync('rm', ['server/datasources.json']);
    this.spawnCommandSync('rm', ['server/middleware.json']);
    this.spawnCommandSync('rm', ['server/config.json']);
    this.spawnCommandSync('rm', ['README.md']);

    this.fs.copyTpl(
      this.templatePath('**/*.json'),
      this.destinationPath(''),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('**/*.js'),
      this.destinationPath(''),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('**/*.sql'),
      this.destinationPath(''),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('**/*.yml'),
      this.destinationPath(''),
      this.answers
    );

    this.fs.copyTpl(
      this.templatePath('**/*.md'),
      this.destinationPath(''),
      this.answers
    );
  }

  addPm2() {
    this.log('Install pm2');
    return this.npmInstall(['pm2'], { save: true })
  }

  addLoopbackConnectors() {
    return this.npmInstall(['loopback-connector-postgresql'], { save: true })
  }

  addMigrationTool() {
    this.spawnCommandSync('mkdir migrations');
    this.log('Install db-migrate');
    return this.npmInstall(['db-migrate', 'db-migrate-pg'], { save: true })
  }

  addTestStack() {
    this.spawnCommandSync('mkdir tests');
    this.log('Install mocha and istanbul for code coverage');
    return this.npmInstall(['mocha', 'istanbul', 'chai', 'sinon', 'sinon-chai'], { 'save-dev': true })
  }
};
