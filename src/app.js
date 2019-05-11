const database = require('../config/database');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

const setupApp = async() => {
  app.use(bodyParser.json());
  app.use('/', routes);

  await database.connect();

  return app;
};
const closeApp = async() => await database.close();

module.exports = {
  setupApp,
  closeApp
};
