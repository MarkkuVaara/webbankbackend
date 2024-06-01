
const bcrypt = require('bcrypt');
const { User, Account } = require('../models/index');

const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7));
      request.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error){
      console.log(error);
      return response.status(401).json({ error: 'token invalid' });
    }
  } else {
    return response.status(401).json({ error: 'token missing' });
  }
  next();

};

usersRouter.get('/', async (request, response) => {
    const users = await User.findAll({
      include: {
        model: Account
      }
    });
    response.json(users);
});

usersRouter.get('/:id', async (request, response, next) => {
    const id = Number(request.params.id);
    const user = await User.findByPk(id);
    if (user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
});

/* usersRouter.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    users = users.filter(user => user.id !== id);
  
    response.status(204).end();
    next(error);
}); */

usersRouter.post('/', tokenExtractor, async (request, response) => {

    const body = request.body;

    const saltRounds = 10;

    try {
      const passwordHash = await bcrypt.hash(body.password, saltRounds);
      const tokenuser = await User.findByPk(request.decodedToken.id);
      const user = await User.create({...request.body, password: passwordHash});
      response.json(user);
    } catch(error) {
      console.log(error);
      return response.status(400).json({ error });
    }

});

usersRouter.put('/:id', tokenExtractor, async (request, response) => {

  const body = request.body;

  const saltRounds = 10;

  try {
    const user = await User.findByPk(request.params.id);
    const tokenuser = await User.findByPk(request.decodedToken.id);

    if (body.usernumber) {
      user.usernumber = body.usernumber;
    }
    if (body.firstname) {
      user.firstname = body.firstname;
    }
    if (body.middlename) {
      user.middlename = body.middlename;
    }
    if (body.lastname) {
      user.lastname = body.lastname;
    }
    if (body.address) {
      user.address = body.address;
    }
    if (body.postnumber) {
      user.postnumber = body.postnumber;
    }
    if (body.city) {
      user.city = body.city;
    }
    if (body.email) {
      user.email = body.email;
    }
    if (body.phone) {
      user.phone = body.phone;
    }
    if (body.homebank) {
      user.homebank = body.homebank;
    }

    if (body.password) {

      const isMatch = await bcrypt.compare(body.password, user.password);

      if (!isMatch) {
        console.log("Error matching old password");
        return response.status(400).json({ error: "Syötetty vanha salasana on väärä." });
      }

      if (body.npassword !== body.npassword2) {
        console.log("Error matching new passwords");
        return response.status(400).json({ error: "Virhe syötteessä 'uusi salasana'" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.npassword, salt);

      user.password = hashedPassword;
      console.log("Salasana vaihdettu");

    }

    await user.save();
    response.json(user);
  } catch(error) {
    console.log(error);
    return response.status(400).json({ error });
  }

});

module.exports = usersRouter;
