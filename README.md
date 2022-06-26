# Applied Chronology

A practical web app to keep track of your job applications,
recording interview dates, offering easy access
to various bits of information and letting you monitor the state
of your job-finding efforts.

The api backend is based on Express.js (on Node),
using Sequelize to interface with a PostgreSQL db.

The frontend is build with Angular, and the code is found in the `client/` folder.

## Running the app

Ensure a PostgreSQL server is running and a database is set up with the appropriate structure,
either according to environment variables (or `.env` configuration),
or with username and db name equal to `testdb` for testing (see `src/config/db.config.ts`).

To set up such a database, assuming a typical Unix `postgresql` installation,
you can run these commands as the user with database admin access (usually `postgres`)
(eg, by `sudo -iu postgres`):

```sh
createuser -d testdb
createdb -O testdb testdb
```

After installing all dependencies (`npm i; cd client; npm i; cd ..;`),
start the backend in dev mode with `npm run dev`, it will serve api requests
at `localhost:8080`;
you can then fire up the frontend by moving to the `client` directory
and running `ng serve -o`
(requires Angular CLI, run `npm install -g @angular/cli` to install it system-wide).

Try out the app by registering new users, adding job applications
and recording interviews for them!

