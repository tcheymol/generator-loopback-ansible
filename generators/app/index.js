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
        type    : 'list',
        name    : 'client',
        message : 'Choose your client',
        default : 'react-redux',
        choices : ['react-redux', 'react', 'angular4', 'none']
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
        message : 'Your git repository URL (used for deployment script)',
        default : '',
      },
      {
        type    : 'input',
        name    : 'stagingIpAddress',
        message : 'Your staging IP address',
        default : '',
      },
      {
        type    : 'input',
        name    : 'prodIpAddress',
        message : '[Optionnal] Your production IP address',
        default : '',
      },
      {
        type    : 'list',
        name    : 'vagrantOs',
        message : 'Choose your Vagrant OS',
        default : 'xenial',
        choices : ['xenial', 'trusty']
      }
    ]).then(answers => {
      this.answers = answers;
      this.answers.clientPublicDirectory = 'client/build';

      if (this.answers.client === 'react-redux') {
        this.answers.installationFile = 'doc/installation-react-redux.md';
      }

      if (this.answers.client === 'react') {
        this.answers.installationFile = 'doc/installation-react.md';
      }

      if (this.answers.client === 'angular4') {
        this.answers.installationFile = 'doc/installation-angular.md';
        this.answers.clientPublicDirectory = 'client/dist';
      }

      if (this.answers.client === 'none') {
        this.answers.installationFile = 'installation-no-client.md';
      }
    });
  }

  _addReactReduxBoilerplate() {
    this.log('Cloning react-boilerplate');
    this.spawnCommandSync('git', [
      'clone',
      '--branch',
      'v3.4.0',
      'https://github.com/react-boilerplate/react-boilerplate.git',
      'client'
    ]);

    this.spawnCommandSync('rm', ['client/internals/webpack/webpack.base.babel.js']);
    this.spawnCommandSync('rm', ['client/appveyor.yml']);
    this.spawnCommandSync('rm', ['client/LICENSE.md']);
    this.spawnCommandSync('rm', ['client/Changelog.md']);
    this.spawnCommandSync('rm', ['client/CODE_OF_CONDUCT.md']);
    this.spawnCommandSync('rm', ['client/.lgtm']);
    this.spawnCommandSync('rm', ['client/MAINTAINERS']);
    this.spawnCommandSync('rm', ['-rf', 'client/.git']);
    this.spawnCommandSync('rm', ['-rf', 'client/.github']);

    return Promise.all([
      'client/internals/webpack/webpack.base.babel.js',
    ].map(file => {
      return this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.answers
      );
    }));
  }

  _addReactBoilerplate() {
    this.spawnCommandSync('npm', ['install', '-g', 'create-react-app']);
    this.log('Using create-react-app');
    this.spawnCommandSync('create-react-app', ['client']);
  }

  _addAngularBoilerplate() {
    this.log('Cloning angular starter');
    this.spawnCommandSync('git', [
      'clone',
      '--branch',
      'v5.2.0',
      'https://github.com/AngularClass/angular-starter.git',
      'client'
    ]);

    this.log('Remove client git history');
    this.spawnCommandSync('rm', ['-rf', 'client/.git']);
  }

  _addClient() {
    if (this.answers.client === 'none') {
      return;
    }

    if (this.answers.client === 'react-redux') {
      this._addReactReduxBoilerplate()
    }

    if (this.answers.client === 'react') {
      this._addReactBoilerplate()
    }

    if (this.answers.client === 'angular4') {
      this._addAngularBoilerplate()
    }
  }

  _addConfigurationTemplates () {
    const files = [
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
      'doc/provisioning.md',
      'doc/tests.md',
      'shipitfile.js',
      'Vagrantfile',
      this.answers.installationFile
    ];

    return Promise.all(files.map(file => {
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

  installProject() {
    return this._addConfigurationTemplates()
    .then(() => this._addServerTemplates())
    .then(() => this._addProvisioningTemplates())
    .then(() => this._addMigrationsTemplates())
    .then(() => this._addClient())
  }

  end() {
    // .gitgnore is not included by npm publish https://github.com/npm/npm/issues/3763
    // It can be bypassed by renaming a gitgnore file to .gitignore
    this.spawnCommandSync('mv', ['./gitignore', './.gitignore']);
    if (this.answers.client === 'react-redux') {
      this.destinationRoot('client');
      this.spawnCommandSync('npm', ['uninstall', 'image-webpack-loader', '--save-dev']);
      this.spawnCommandSync('npm', ['run', 'setup']);
      this.spawnCommandSync('rm', ['-rf', '.git']);
    };

    this.log('Everything went well, enjoy your new app!')
  }
};

module.exports = LoopbackGenerator;
