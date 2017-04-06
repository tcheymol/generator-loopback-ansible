module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/<%= appName %>',
      deployTo: '~/<%= appName %>',
      repositoryUrl: '<%= repositoryUrl %>',
      ignores: ['.git', 'tests', '.gitignore', 'devops', 'client/tests', 'node_modules', 'client/node_modules'],
      rsync: ['--del'],
      keepReleases: 3,
      key: '~/.ssh/id_rsa',
      shallowClone: true,
    },
    staging: {
      branch: 'staging',
      servers: 'www-data@<%= stagingUrl %>',
    },
    prod: {
      branch: 'master',
      servers: 'www-data@<%= prodUrl %>',
    },
  });

  var npmBackInstall = function () {
    return shipit.remote("cd " + shipit.releasePath + " && yarn install");
  };

  var npmFrontInstall = function () {
    return shipit.remote("cd " + shipit.releasePath + "/client && yarn install");
  };

  var npmFrontClean= function () {
    return shipit.remote("cd " + shipit.releasePath + "/client && npm run clean");
  }

  var npmFrontCompile = function () {
    return shipit.remote("cd " + shipit.releasePath + " && npm run build:client");
  }

  var runMigrations = function () {
    return shipit.remote("cd " + shipit.releasePath + " && npm run migrate:up");
  }

  var restartServer = function () {
    return shipit.remote("cd " + shipit.releasePath + " && npm run start:prod");
  }

  shipit.on('deployed', function() {
    return shipit.start('install');
  });

  // blTask will block other tasks during its execution (synchronous)
  shipit.blTask('install', function() {
    return npmFrontInstall()
      .then(npmBackInstall)
      .then(npmFrontClean)
      .then(npmFrontCompile)
      .then(runMigrations)
      .then(restartServer)
      .then(function () {
        shipit.log('Install Done!\n');
      });
  });
};
