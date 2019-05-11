const supertest = require('supertest');
const { setupApp, closeApp } = require('../../src/app.js');
const nock = require('nock');

describe('General test', () => {
  let request;
  beforeAll(async function() {
    const app = await setupApp();
    request = supertest(app);
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(async() => await closeApp());

  describe('route /', () => {
    describe('when a GET request is done to / endpoint', () => {
      test('should respond with the githubs login', async() => {
        const scope = nock('https://api.github.com')
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .get('/users/waldemarnt')
          .reply(200, {
            login: 'waldemarnt'
          });

        const response = await request.get('/waldemarnt/followers');
        expect(response.body).toEqual({login:'waldemarnt'});
      });
      test('should throw error when the user is not found', async() => {
        const scope = nock('https://api.github.com')
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .get('/users/an_invalid_user')
          .reply(404, 'Not Found');

        const response = await request.get('/an_invalid_user/followers');
          expect(response.body).toEqual({error: 'Not Found'});
          scope.done();
      });
    });
  });

});
