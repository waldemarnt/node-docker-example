const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = Promise;

const dbConfig = config.get('App.dbConfig');
const dbConnectionUrl = `${dbConfig.get('url')}:${dbConfig.get('port')}/${dbConfig.get('dbName')}`;

const mongodbUrl = config.mongodbUrl;

const connect = () => mongoose.connect(dbConnectionUrl, {
  useMongoClient: true
});

module.exports = {
    connect
};
