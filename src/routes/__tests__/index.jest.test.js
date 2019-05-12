const supertest = require('supertest');
const { setupApp, closeApp } = require('../../../src/app.js');
const axios = require('axios');

jest.mock('axios');

describe('Github resource with jest', () => {
  let request;
  beforeAll(async function() {
    const app = await setupApp();
    request = supertest(app);
  });

  afterAll(async () => await closeApp());

  describe('route /', () => {
    describe('when a GET request is done to / endpoint', () => {
      test('should respond with the followers count', async () => {
        axios.get.mockResolvedValue({ data: { followers: 120 } });

        const response = await request.get('/waldemarnt/followers');
        expect(response.body).toEqual({ followers: 120 });
      });

      test('should throw error when the user is not found', async () => {
        axios.get.mockRejectedValue({ response: { data: 'Not Found', status: 404 } });

        const response = await request.get('/an_invalid_user/followers');
        expect(response.body).toEqual({ error: 'Not Found' });
      });
    });
  });
});
