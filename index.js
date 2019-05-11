const log = require('./src/log');
const { setupApp } = require('./src/app');
const config = require('./config/environment');

setupApp()
  .then(app => app.listen(config.port, () => log.info(`app running on port ${config.port}`)))
  .catch(error => {
    log.error(error);
    process.exit(1); // eslint-disable-line
  });
