## Installation

### Installation

- Launch VM: `vagrant up`

- Connect to the vagrant: `vagrant ssh`

- Run migrations:
```
cd /var/www/<%= appName %>/current && npm run migrate:up
```

- Start the server:
```
cd /var/www/<%= appName %>/current && node server/server.js
```

Now, you are set up !

You can browse a static page served by Loopback at the following url : `http://10.0.0.10`
You can also browse Loopback's explorer at : `http://10.0.0.10/explorer`

### How to develop using webpack

 Webpack can watch your frontend files and recompiles the code automatically as soon as you change your code (live-reloading).

 :bangbang: The webpack live-reloading is really slow in a vagrant. To avoid that, run the webpack-dev-server on your local environment:
 - `cd client && npm start`.


 Think of the loopback server in the vagrant as an external API that you will query from your reactjs app.

 In your local environment, all your HTTP requests should be redirected to the vagrant IP address.

 For example, if you want to fetch the url `/api/users`, you can do it like this:

 ```javascript

 let baseApiPath = '';
 let options = {};

 if (process.env.NODE_ENV === 'development') {
   baseApiPath = 'http://10.0.0.10';
   options.credentials = 'include'; // needed for CORS requests
 }

 fetch(`${baseApiPath}/api/users`, options)
 ```

### Migrations:

In your vagrant, run:

- Create: `npm run migrate:create`
- Down: `npm run migrate:down`
- Up: `npm run migrate:up`
