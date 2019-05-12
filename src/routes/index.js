const express = require('express');

const router = express.Router();

const routeSetup = githubResource => {
  router.get('/:login/followers', async (req, res) => {
    const { login } = req.params;
    const response = await githubResource.getFollowerCount(login);

    res.json(response);
  });
  return router;
};

module.exports = routeSetup;
