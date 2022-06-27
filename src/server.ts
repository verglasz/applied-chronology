import express from 'express';

import db from './models/index';
import users from './routes/users';

const app = express();
const defaultPort = 8080;

// parse content-type: application/json requests
app.use(express.json());

// connect to db
db.sequelize.sync();

// route handler for the default home page
app.get('/', (_req, res) => {
  res.json({ message: 'hello there' });
});
// route handler for fun
app.get('/hellothere', (_req, res) => {
  res.json({ message: 'General Kenobi' });
});

app.use('/api/users', users);

// start the express server
app.listen(defaultPort, () => {
  console.log(`server started at http://localhost:${defaultPort}`);
});
