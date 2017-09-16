const database = require('../config/database');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const log = require('./log');

const app = express();

const setupApp = () => {
  app.use(bodyParser.json());
  app.use('/', routes);

  return app;
};

module.exports = async function() {
  await database.connect();

  return setupApp();
};
