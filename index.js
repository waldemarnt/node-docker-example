const log = require('./src/log');
const { setupApp } = require('./src/app');
const config = require('config');
const { createLightship } = require('lightship');
/**
 * Uses node cluster to make sure all CPU cores will be used
 * https://nodejs.org/api/cluster.html
 */
const cluster = require('cluster');
//Get the number of CPUs available
const CPUs = require('os').cpus().length;

/**
 * Lightship adds readiness and liveness prob endpoints
 * for kubernetes healthchecks https://github.com/gajus/lightship
 */
const ls = createLightship();

/**
 * If the cluster module is avaible
 * and the process is the master
 */
if(config.get('App.cluster.enabled') && cluster.isMaster) {
  log.info(`Master ${process.pid} is running`);

  // forks a process for each CPU core
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
