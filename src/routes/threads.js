const express = require('express');
const fb = require('fibonacci');
const runFibonacci = require('../workers/fibonacciWorker');
const runFibonacciPool = require('../workers/fibonacciWorkerPool');
const runFibonacciShared = require('../workers/fibonacciWorkerShared');
const log = require('../log');

const router = express.Router();

router.get('/fibonacci', (req, res) => {
  const number = fb.iterate(10000);
  res.send(number);
});

router.get('/fibonacciThreaded', async (req, res) => {
  runFibonacci({ iterations: 10000 }).then(result => log.info(result));
  res.send('processing');
});

router.get('/fibonacciThreadedPool', async (req, res) => {
  runFibonacciPool({ iterations: 10000 }).then(result => log.info(result));
  res.send('processing');
});

router.get('/fibonacciThreadedShared', async (req, res) => {
  /**
   * Uses shared SharedArrayBuffer to share data with the workers
   */
  const sharedUint8Array = new Uint8Array(new SharedArrayBuffer(4));
  for (let i = 0; i < 4; i++) {
    runFibonacciShared({ iterations: 1000, position: i, arr: sharedUint8Array }).then(result => console.log(result));
  }
  res.send('processing');
});

module.exports = router;
