# Applied Chronology

A practical web app to keep track of your job applications,
recording interviews and other events, offering easy access
to various bits of information and letting you monitor the state
of your applications.

The api backend is based on Express.js (on Node),
using Sequelize to interface with a PostgreSQL db.

The frontend is build with Angular, and the code is found in the `client/` folder.

## Running the app

Ensure a PostgreSQL server is running and a database is set up with the appropriate structure,
either according to a `.env` configuration,
or with username and db name equal to `testdb` for testing (see `src/config/db.config.ts`).

