
const { Account, User } = require('../models/index');

const accountsRouter = require('express').Router();
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

accountsRouter.get('/', async (request, response) => {
    const accounts = await Account.findAll({
      attributes: { exclude: ['userId'] },
    });
    response.json(accounts);
});

accountsRouter.get('/:id', async (request, response, next) => {
    const id = Number(request.params.id);
    const account = await Account.findByPk(id);
    if (account) {
      response.json(account);
    } else {
      response.status(404).end();
    }
});

/* accountsRouter.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    accounts = accounts.filter(account => account.id !== id);
  
    response.status(204).end();
    next(error);
}); */

accountsRouter.post('/', tokenExtractor, async (request, response) => {

    try {
      const user = await User.findByPk(request.decodedToken.id);
      const account = await Account.create({...request.body, userId: user.id, creationdate: new Date()});
      response.json(account);
    } catch(error) {
      console.log(error);
      return response.status(400).json({ error });
    }

});

module.exports = accountsRouter;
