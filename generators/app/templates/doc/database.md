## Database

### Accessing the database
- In your vagrant:
  - `psql -U <%= appName %> -d <%= appName %>``


### Migrations:

In your vagrant, run:
- `sudo su www-data`
- Create: `npm run migrate:create`
- Down: `npm run migrate:down`
- Up: `npm run migrate:up`
