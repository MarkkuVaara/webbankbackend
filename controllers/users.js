
const User = require('../models/user');

const usersRouter = require('express').Router();

usersRouter.get('/', async (request, response) => {
    const users = await User.findAll();
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

usersRouter.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    users = users.filter(user => user.id !== id);
  
    response.status(204).end();
    next(error);
});

usersRouter.post('/', async (request, response) => {
  
    const user = await User.create(request.body);
    response.json(user);
    
});

module.exports = usersRouter;
