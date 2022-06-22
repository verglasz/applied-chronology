import express from 'express';
import path from 'path';

const app = express();
const defaultPort = 8080;

// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.json({ hallo: 'from server', url: req.url, body: req.body });
});

// start the express server
app.listen(defaultPort, () => {
  console.log(`server started at http://localhost:${defaultPort}`);
});
