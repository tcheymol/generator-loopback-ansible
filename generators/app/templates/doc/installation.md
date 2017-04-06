## Installation

### Installation

- Launch VM: `vagrant up`

- Connect to the vagrant: `vagrant ssh`

- Compile the frontend code:
```
sudo su - www-data
cd <%= appName %>/current/client && npm rebuild node-sass
cd ../ && npm run build:client
```

- Run migration if needed:
```
cd <%= appName %>/current && npm run migrate:up
```

- Start the server:
```
cd <%= appName %>/current && node server/server.js
```

Now, you are set up !

You can browse a static page served by Loopback at the following url : `http://10.0.0.10`
You can also browse Loopback's explorer at : `http://10.0.0.10/explorer`

### Local dev server

The webpack live-reloading is really slow in a vagrant. We prefer to run a local server to compile the frontend code. Use the server in the vagrant as an external API in dev environment.

To develop, run in your local environment (not the vagrant):

```
cd client && npm run dev
```

### Migrations:

- Create: `npm run migrate:create`
- Down: `npm run migrate:down`
- Up: `npm run migrate:up`
