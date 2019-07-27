const log = require('./src/log');
const { setupApp } = require('./src/app');
const config = require('config');
const { createLightship } = require('lightship');
const cluster = require('cluster');
const CPUs = require('os').cpus().length;

log.info('CPUs available', CPUs);

const ls = createLightship();

if(config.get('App.cluster.enabled') && cluster.isMaster) {
  log.info(`Master ${process.pid} is running`);

  for(let i = 0; i < CPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    log.info(`worker ${worker.process.pid} died`);
  });
} else {
  setupApp()
    .then(app => {
      app.listen(config.get('App.port'), () => log.info(`app running on port ${config.get('App.port')}`));
      log.info(`Worker ${process.pid} started`);
      return app;
    })
    .then(() => ls.signalReady())
    .catch(error => {
      log.error(error);
      process.exit(1); // eslint-disable-line
    });
}
