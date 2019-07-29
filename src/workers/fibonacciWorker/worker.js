const fb = require('fibonacci');
const { parentPort, workerData } = require('worker_threads');

const result = fb.iterate(workerData.iterations);
/**
 * Send a copy the result object back to the main Thread
 */
parentPort.postMessage(result);
