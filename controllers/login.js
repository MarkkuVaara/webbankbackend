
const jwt = require('jsonwebtoken');
const loginrouter = require('express').Router();

const { SECRET } = require('../utils/config');
const { User } = require('../models/index');

loginrouter.post('/', async (request, response) => {

  const body = request.body;

  const user = await User.findOne({
    where: {
      usernumber: body.usernumber
    }
  });

  const passwordCorrect = body.password === user.password;

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    usernumber: user.usernumber,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });

})

module.exports = loginrouter;
