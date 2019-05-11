const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:login/followers', async(req, res) => {
  const { login } = req.params;
  let response;
  try {
    const {data} = await axios.get(`https://api.github.com/users/${login}`);
    response =  {login: data.login};
  } catch(error) {
    const {status, data } = error.response;
    if(status == 404) {
      response = {error: data}
    }else {
      response = {error: 'Error'}
    }
  }
  res.json(response);
});

module.exports = router;
