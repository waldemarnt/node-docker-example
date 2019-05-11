const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = Promise;
const dbConfig = config.get('App.database');

const mongodbUrl = `${dbConfig.get('url')}:${dbConfig.get('port')}/${dbConfig.get('dbName')}`;

const connect = () => mongoose.connect(mongodbUrl, {
    useMongoClient: true
});
const close = () => mongoose.connection.close();

module.exports = {
    connect,
    close
};
