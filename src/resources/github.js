const axios = require('axios');

class Github {
  constructor(request = axios) {
    this.request = request;
  }

  async getFollowerCount(login) {
    let response;
    try {
      const { data } = await this.request.get(`https://api.github.com/users/${login}`);
      response = { followers: data.followers };
    } catch (error) {
      const { status, data } = error.response;
      if (status == 404) {
        response = { error: data };
      } else {
        response = { error: 'Error' };
      }
    }
    return response;
  }
}

module.exports = Github;
