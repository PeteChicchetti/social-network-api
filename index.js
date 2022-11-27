// Require routes and packages
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// PORT and express server
const PORT = process.env.port || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// MongoDB server connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}!`);
  });
});
