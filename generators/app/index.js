const Generator = require('yeoman-generator');

class LoopbackGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type    : 'input',
        name    : 'appName',
        message : 'Your application name',
      },
      {
        type    : 'confirm',
        name    : 'addClient',
        message : 'Do you want a react-redux client ?',
        default : true,
      },
      {
        type    : 'input',
        name    : 'stagingDatabasePassword',
        message : 'Your staging database password',
        default : 'pleaseChangeMe',
      },
      {
        type    : 'input',
        name    : 'prodDatabasePassword',
        message : 'Your production database password',
        default : 'pleaseChangeMe',
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
      {
        type    : 'list',
        name    : 'vagrantOs',
        message : 'Choose your Vagrant OS',
        default : 'xenial',
        choices : ['xenial', 'trusty']
      }
    ]).then((answers) => {
      this.answers = answers;
    });
  }

  _addClient() {
    if (this.answers.addClient) {
      this.log('Cloning react-redux-starter-kit');
      this.spawnCommandSync('git', [
        'clone',
        '--branch',
        'v3.0.0-alpha.2',
        'https://github.com/davezuko/react-redux-starter-kit.git',
        'client'
      ]);
      this.log('Updating project config to use webpack-dev-server');
      this.spawnCommandSync('rm', ['client/build/webpack.config.js']);
      this.spawnCommandSync('rm', ['client/config/index.js']);
      this.log('Remove git history');
      this.spawnCommandSync('rm', ['-rf', 'client/.git']);

      return Promise.all([
        'client/build/webpack.config.js',
        'client/config/index.js',
      ].map(file => {
        return this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file),
          this.answers
        );
      }));
    }
  }

  _addConfigurationTemplates () {
    return Promise.all([
     'gitignore',
     '.yo-rc.json',
     '.editorconfig',
     '.eslintignore',
     'ansible.cfg',
     'database.json',
     'package.json',
     'yarn.lock',
     'pm2.yml',
     'README.md',
     'doc/deployment.md',
     'doc/installation.md',
     'doc/provisioning.md',
     'doc/tests.md',
     'shipitfile.js',
     'Vagrantfile',
   ].map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file),
       this.answers
     );
   }));
  }

  _addMigrationsTemplates () {
    return Promise.all([
     'migrations/20161206103004-create-user.js',
     'migrations/sqls/20161206103004-create-user-up.sql',
     'migrations/sqls/20161206103004-create-user-down.sql',
    ].map(file => {
      return this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.answers
      );
    }));
  }

  _addProvisioningTemplates () {
    this.fs.copy(
      this.templatePath('devops/provisioning/roles'),
      this.destinationPath('devops/provisioning/roles'),
      this.answers
    );

    return Promise.all([
     'devops/provisioning/group_vars/prod',
     'devops/provisioning/group_vars/staging',
     'devops/provisioning/group_vars/vagrant',
     'devops/provisioning/hosts/prod',
     'devops/provisioning/hosts/staging',
     'devops/provisioning/hosts/vagrant',
     'devops/provisioning/vars/main.yml',
     'devops/provisioning/playbook.yml',
   ].map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file),
       this.answers
     );
   }));
  }

  _addServerTemplates () {
    return Promise.all([
     'server/.eslintrc',
     'server/component-config.json',
     'server/config.json',
     'server/datasources.json',
     'server/datasources.local.js',
     'server/middleware.development.json',
     'server/middleware.json',
     'server/model-config.json',
     'server/server.js',
     'server/models/user.js',
     'server/models/user.json',
     'server/boot/authentication.js',
     'server/boot/create-admin.js',
     'tests/test.js',
   ].map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file),
       this.answers
     );
   }));
  }

  _installDependencies() {
    return this.yarnInstall();
  }

  installProject() {
    return this._addConfigurationTemplates()
    .then(() => this._addServerTemplates())
    .then(() => this._addProvisioningTemplates())
    .then(() => this._addMigrationsTemplates())
    .then(() => this._addClient())
    .then(() => this._installDependencies())
  }

  end() {
    // .gitgnore is not included by npm publish https://github.com/npm/npm/issues/3763
    // It can be bypassed by renaming a gitgnore file to .gitignore
    this.spawnCommandSync('mv', ['./gitignore', './.gitignore']);
    if (this.answers.addClient) {
      this.destinationRoot('client')
      return this.yarnInstall();
    }
  }
};

module.exports = LoopbackGenerator;
