
const { Account } = require('../models/index');

const accountsRouter = require('express').Router();

accountsRouter.get('/', async (request, response) => {
    const accounts = await Account.findAll();
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

accountsRouter.post('/', async (request, response) => {

    try {
      const account = await Account.create(request.body);
      response.json(account);
    } catch(error) {
      console.log(error);
      return response.status(400).json({ error });
    }

});

module.exports = accountsRouter;
