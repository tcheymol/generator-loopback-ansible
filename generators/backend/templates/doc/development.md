## Installation

### Local dev server

```
cd client && webpack-dev-server --config config/webpack.config.js --no-info --colors --open
```

### Installation

- Launch VM: `vagrant up`

- Connect to the vagrant: `vagrant ssh`

- Create the database and the role:
```
createuser -U postgres <%= databaseUser %>
createdb -U postgres <%= databaseName %>
```

- Start server with pm2:
```
sudo su - www-data
cd <%= appName %>/current/client && npm rebuild node-sass
NODE_ENV=production npm run compile
cd ../ && ./node_modules/.bin/pm2 startOrRestart pm2.yml
```

Now, you are set up !

You can browse a static page served by Loopback at the following url : `http://10.0.0.10`
You can also browse Loopback's explorer at : `http://10.0.0.10/explorer`

## Tests
- Backend tests: `NODE_ENV=test ./node_modules/.bin/istanbul cover ./node_modules/.bin/mocha -- tests/**/*.js -R spec`

- Frontend tests: `cd client && npm test`

### Migrations:

- Create: `npm run migrate:create`
- Down: `npm run migrate:down`
- Up: `npm run migrate:up`
