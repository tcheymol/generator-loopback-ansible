## Installation

### Installation

#### Install dependencies

- `yarn`

- Build the frontend: `cd client && npm run build:prod`

#### Create the vagrant
- Launch VM:
  - `vagrant up`
  - If you encounter error `ttyname failed: Inappropriate ioctl for devices`:
    - Update vagrant to the latest version from the website (it works on 1.9.5)

- Connect to the vagrant as www-data:
  - `vagrant ssh`
  - `sudo su www-data`

#### Setup database

- Run migrations:
  - `cd /var/www/<%= appName %>/current && npm run migrate:up`

#### Start the server

- Start the server:
  - `cd /var/www/<%= appName %>/current && node server/server.js`

Now, you are set up !

You can browse a static page served by Loopback at the following url : `http://10.0.0.10`
You can also browse Loopback's explorer at : `http://10.0.0.10/explorer`

### How to develop using webpack

 Webpack can watch your frontend files and recompiles the code automatically as soon as you change your code.

 :bangbang: The webpack live-reloading is really slow in a vagrant. To avoid that, run the webpack-dev-server on your local environment:
 - `cd client && npm run server:dev:hmr`.


 Think of the loopback server in the vagrant as an external API that you will query from your local reactjs app.

 In your local environment, all your HTTP requests should be redirected to the vagrant IP address.

 For example, if you want to fetch the url `/api/users`, you can adapt the file `client/app/utils/request.js` to use the following snippet:

 ```javascript

const request = function(url) {
  let baseApiPath = '';
  let options = {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (process.env.NODE_ENV === 'development') {
    baseApiPath = 'http://10.0.0.10';
    options.credentials = 'include'; // needed for CORS requests to the vagrant
  }

  return fetch(`${baseApiPath}/${url}`, options)
}

request('api/users')
.then(console.log)
 ```

### Migrations:

In your vagrant, run:

- Create: `npm run migrate:create`
- Down: `npm run migrate:down`
- Up: `npm run migrate:up`
