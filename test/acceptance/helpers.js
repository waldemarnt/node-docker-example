const supertest = require('supertest');
const chai = require('chai');
const setupApp = require('../../src/app.js');

global.setupApp = setupApp;
global.supertest = supertest;
global.expect = chai.expect;
