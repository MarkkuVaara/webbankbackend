
const Account = require('../models/account');

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

accountsRouter.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    accounts = accounts.filter(account => account.id !== id);
  
    response.status(204).end();
    next(error);
});

accountsRouter.post('/', async (request, response) => {

    const account = await Account.create(request.body);
    response.json(account);

});

module.exports = accountsRouter;
