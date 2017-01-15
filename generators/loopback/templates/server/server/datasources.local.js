const database = require('../database.json');

const datasourcesDevConfig = {
  db: {
    name: 'db',
    connector: 'postgresql',
    host: database.dev.host,
    port: database.dev.port,
    database: database.dev.database,
    username: database.dev.user,
    password: database.dev.password,
  },
  memory: {
    name: 'memory',
    connector: 'memory',
  },
};

const datasourcesProdConfig = {
  db: {
    name: 'db',
    connector: 'postgresql',
    host: database.production.host,
    port: database.dev.port,
    database: database.production.database,
    username: database.production.user,
    password: database.production.password,
  },
  memory: {
    name: 'memory',
    connector: 'memory',
  },
};

const config = process.env.NODE_ENV === 'production' ? datasourcesProdConfig : datasourcesDevConfig;

module.exports = config;
