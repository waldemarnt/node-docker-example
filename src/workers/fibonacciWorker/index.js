const { Worker } = require('worker_threads');

const runFibonacci = workerData => {
  return new Promise((resolve, reject) => {
    /**
     * Path has to be absolute or relative, the ./ is relative to the
     * app's root directory.
     */
    const worker = new Worker('./src/workers/fibonacciWorker/worker.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

module.exports = runFibonacci;
