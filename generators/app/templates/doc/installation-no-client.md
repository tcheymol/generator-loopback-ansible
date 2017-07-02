## Installation

### Installation

#### Install dependencies

- `yarn`

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

### Migrations:

In your vagrant, run:

- Create: `npm run migrate:create`
- Down: `npm run migrate:down`
- Up: `npm run migrate:up`
