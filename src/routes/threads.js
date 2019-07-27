const express = require('express');
const fb = require('fibonacci');
const runFibonacci = require('../workers/fibonacciWorker');
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

module.exports = router;
