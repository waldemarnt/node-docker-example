const supertest = require('supertest');
const { setupApp, closeApp } = require('../../../src/app.js');
const nock = require('nock');

describe('Github resource with nock', () => {
  let request;
  beforeAll(async function() {
    const app = await setupApp();
    request = supertest(app);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(async () => await closeApp());

  describe('route /', () => {
    describe('when a GET request is done to / endpoint', () => {
      test('should respond with the followers count', async () => {
        nock('https://api.github.com')
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .get('/users/waldemarnt')
          .reply(200, {
            followers: 120,
          });

        const response = await request.get('/waldemarnt/followers');
        expect(response.body).toEqual({ followers: 120 });
      });

      test('should throw error when the user is not found', async () => {
        nock('https://api.github.com')
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .get('/users/an_invalid_user')
          .reply(404, 'Not Found');
        const response = await request.get('/an_invalid_user/followers');
        expect(response.body).toEqual({ error: 'Not Found' });
      });
    });
  });
});
