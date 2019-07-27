const express = require('express');
const threads = require('./threads');

const router = express.Router();

const routeSetup = githubResource => {
  router.use('/threads', threads);

  router.get('/:login/followers', async (req, res) => {
    const { login } = req.params;
    const response = await githubResource.getFollowerCount(login);

    res.json(response);
  });
  return router;
};

module.exports = routeSetup;
