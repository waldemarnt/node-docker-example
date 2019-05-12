const supertest = require('supertest');
const { setupApp, closeApp } = require('../../../src/app.js');
const Github = require('../../resources/github');

describe('Github resource with di', () => {
  let request;
  const githubResource = new Github();
  beforeAll(async function() {
    const app = await setupApp(githubResource);
    request = supertest(app);
  });

  afterAll(async () => await closeApp());

  describe('route /', () => {
    describe('when a GET request is done to / endpoint', () => {
      test('should respond with the followers count', async () => {
        const fakeRequest = {
          get: () => Promise.resolve({ data: { followers: 120 } }),
        };
        githubResource.request = fakeRequest;

        const response = await request.get('/waldemarnt/followers');
        expect(response.body).toEqual({ followers: 120 });
      });

      test('should throw error when the user is not found', async () => {
        const fakeRequest = {
          get: () => Promise.reject({ response: { data: 'Not Found', status: 404 } }),
        };
        githubResource.request = fakeRequest;

        const response = await request.get('/an_invalid_user/followers');
        expect(response.body).toEqual({ error: 'Not Found' });
      });
    });
  });
});
