const Generator = require('yeoman-generator');
const _ = require('lodash');

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
        name    : 'backend',
        message : 'Choose your backend',
        default : 'API Platform (Symfony)',
        choices : ['API Platform (Symfony)', 'Loopback (nodejs)']
      },
      {
        type    : 'list',
        name    : 'client',
        message : 'Choose your client',
        default : 'react-redux',
        choices : ['react-redux', 'angular4', 'none']
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

    this.spawnCommandSync('rm', ['client/src/App.js']);

    return Promise.all([
      'client/src/App.js',
      'client/src/index.js',
      'client/src/reducers.js',
      'client/src/routes.js',
      'client/src/store.js',
      'client/src/containers/home-view/index.js',
      'client/src/containers/home-view/style.css',
      'client/src/containers/page/index.js',
      'client/src/containers/page/style.css',
      'client/src/containers/root/index.js',
      'client/src/containers/root/logo.svg',
      'client/src/containers/root/style.css',
      'client/src/utils/request.js',
      'client/src/translations/fr.json',
      'client/src/utils/request.test.js',
    ].map(file => {
      return this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.answers
      );
    }))
    .then(() => {
      let content = {
        dependencies: {
          'react-intl': '2.3.0',
          'react-redux': '4.4.6',
          'react-router': '3.0.0',
          'react-router-redux': '4.0.6',
          'material-ui': '0.18.7',
          'redux':'3.7.2',
          'redux-saga': '0.15.6',
        },
        devDependencies: {
          'eslint': '3.9.1',
          'babel-eslint':'7.1.1',
          'nsp': '2.6.3'
        },
      };
      try {
        let existingPackage = this.fs.readJSON('./client/package.json');
        content = _.merge(content, existingPackage);
      } catch (e) {}
      this.fs.writeJSON(this.destinationPath('./client/package.json'), content);
    });
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
      'README.md',
      'Vagrantfile',
      this.answers.installationFile
    ];

    if (this.answers.backend === 'Loopback (nodejs)') {
      files.concat([
        'database.json',
        'package.json',
        'yarn.lock',
        'pm2.yml',
        'shipitfile.js',
        'doc/deployment-node.md',
        'doc/provisioning-node.md',
        'doc/tests-node.md',
      ])
    }

    return Promise.all(files.map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file),
       this.answers
     );
   }));
  }

  _addMigrationsTemplates () {
    if (this.answers.backend !== 'Loopback (nodejs)') {
      return;
    }

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
    if (this.answers.backend === 'API Platform (Symfony)') {
      this.fs.copy(
        this.templatePath('devops-symfony/provisioning/roles'),
        this.destinationPath('devops-symfony/provisioning/roles'),
        this.answers
      );

      this.fs.copy(
        this.templatePath('devops-symfony/deploy'),
        this.destinationPath('devops-symfony/deploy'),
        this.answers
      );

      return Promise.all([
        'Gemfile',
        'Gemfile.lock',
        'Capfile',
        'devops-symfony/provisioning/group_vars/prod',
        'devops-symfony/provisioning/group_vars/staging',
        'devops-symfony/provisioning/group_vars/vagrant',
        'devops-symfony/provisioning/hosts/prod',
        'devops-symfony/provisioning/hosts/staging',
        'devops-symfony/provisioning/hosts/vagrant',
        'devops-symfony/provisioning/vars/main.yml',
        'devops-symfony/provisioning/vars/ubuntu-xdebug.yml',
        'devops-symfony/provisioning/playbook.yml',
     ].map(file => {
       return this.fs.copyTpl(
         this.templatePath(file),
         this.destinationPath(file),
         this.answers
       );
     }));
    }

    if (this.answers.backend === 'Loopback (nodejs)') {
      this.fs.copy(
        this.templatePath('devops-node/provisioning/roles'),
        this.destinationPath('devops-node/provisioning/roles'),
        this.answers
      );

      return Promise.all([
       'devops-node/provisioning/group_vars/prod',
       'devops-node/provisioning/group_vars/staging',
       'devops-node/provisioning/group_vars/vagrant',
       'devops-node/provisioning/hosts/prod',
       'devops-node/provisioning/hosts/staging',
       'devops-node/provisioning/hosts/vagrant',
       'devops-node/provisioning/vars/main.yml',
       'devops-node/provisioning/playbook.yml',
     ].map(file => {
       return this.fs.copyTpl(
         this.templatePath(file),
         this.destinationPath(file),
         this.answers
       );
     }));
    }
  }

  _addNodeServerTemplates () {
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

  _addSymfonyServer () {
    this.spawnCommandSync('php', ['-r', "copy('https://getcomposer.org/installer', 'composer-setup.php');"]);
    this.spawnCommandSync('php', ['-r', "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"]);
    this.spawnCommandSync('php', ['-r', 'composer-setup.php']);
    this.spawnCommandSync('php', ['-r', "unlink('composer-setup.php');"]);
    this.spawnCommandSync('composer', ['create-project', 'api-platform/api-platform', 'server']);
    this.spawnCommandSync('cd', ['server/web']);
  }

  installProject() {
    return this._addConfigurationTemplates()
    .then(() => {
      if (this.answers.backend === 'Loopback (nodejs)') {
        return this._addNodeServerTemplates();
      } else if (this.answers.backend === 'API Platform (Symfony)') {
        return this._addSymfonyServer();
      }
    })
    .then(() => this._addProvisioningTemplates())
    .then(() => this._addMigrationsTemplates())
    .then(() => this._addClient())
  }

  end() {
    // .gitgnore is not included by npm publish https://github.com/npm/npm/issues/3763
    // It can be bypassed by renaming a gitgnore file to .gitignore
    this.spawnCommandSync('mv', ['./gitignore', './.gitignore']);

    if (this.answers.backend === 'Loopback (nodejs)') {
      this.spawnCommandSync('mv', ['./devops-node', './devops']);
    };

    if (this.answers.backend === 'API Platform (Symfony)') {
      this.spawnCommandSync('mv', ['./devops-symfony', './devops']);
    };

    if (this.answers.client === 'react-redux') {
      this.destinationRoot('client');
      this.spawnCommandSync('yarn');
    };

    this.log('Everything went well, enjoy your new app!')
  }
};

module.exports = LoopbackGenerator;
