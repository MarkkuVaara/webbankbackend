
const bcrypt = require('bcrypt');
const { User, Account } = require('../models/index');

const usersRouter = require('express').Router();

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

usersRouter.post('/', async (request, response) => {

    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    try {
      const user = await User.create({...request.body, password: passwordHash});
      response.json(user);
    } catch(error) {
      console.log(error);
      return response.status(400).json({ error });
    }

});

module.exports = usersRouter;
