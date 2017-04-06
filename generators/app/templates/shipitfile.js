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

  shipit.task('deploy:finish', () => {
    return shipit.remote('cd ~/<%= appName %>/current && npm install --production && npm run build:client && npm run migrate:up && npm run start:prod');
  });
};
