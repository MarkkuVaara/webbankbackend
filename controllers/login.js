
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginrouter = require('express').Router();

const { SECRET } = require('../utils/config');
const { User } = require('../models/index');

loginrouter.post('/', async (request, response, error) => {

  const body = request.body;

  try {
    const user = await User.findOne({
      where: {
        usernumber: body.usernumber
      }
    });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)

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
    .send({ token, usernumber: user.usernumber });

  } catch(error) {
    console.log(error);
    return response.status(400).json({ error });
  }

})

module.exports = loginrouter;
