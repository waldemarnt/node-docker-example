const log = require('./src/log');
const { setupApp } = require('./src/app');
const config = require('config');

setupApp()
  .then(app => app.listen(config.get('App.port'), () => log.info(`app running on port ${config.get('App.port')}`)))
  .catch(error => {
    log.error(error);
    process.exit(1); // eslint-disable-line
  });
