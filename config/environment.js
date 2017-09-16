const config = {
  development: {
    mongodbUrl: process.env.MONGODB_URL || 'mongodb://mongodb/development',
    port: process.env.PORT || 3000
  },
  test: {
    mongodbUrl: process.env.MONGODB_URL || 'mongodb://mongodb/test',
    port: process.env.PORT || 3000
  }

};

const env = process.env.NODE_ENV;

module.exports = config[env];
