const mongoose = require('mongoose');
const config = require('./environment');

mongoose.Promise = Promise;

const mongodbUrl = config.mongodbUrl;

const connect = () => mongoose.connect(mongodbUrl, {
    useMongoClient: true
});

module.exports = {
    connect
};
