const Github = require('../github');

describe('Github Resource', () => {
  const fakeRequest = {
    get: jest.fn(),
  };
  const githubResource = new Github(fakeRequest);
  afterEach(() => jest.clearAllMocks());

  it('should return the followers count for a given github user', async () => {
    fakeRequest.get.mockResolvedValueOnce({ data: { followers: 120 } });

    const response = await githubResource.getFollowerCount('waldemarnt');
    expect(response).toEqual({ followers: 120 });
  });
  it('should return not found when the user doenst exist', async () => {
    fakeRequest.get.mockRejectedValueOnce({ response: { data: 'Not Found', status: 404 } });

    const response = await githubResource.getFollowerCount('odkasodksaodk');
    expect(response).toEqual({ error: 'Not Found' });
  });
  it('should return error when a general error happens', async () => {
    fakeRequest.get.mockRejectedValueOnce({ response: { data: 'Error', status: 500 } });

    const response = await githubResource.getFollowerCount('waldemarnt');
    expect(response).toEqual({ error: 'Error' });
  });
});
