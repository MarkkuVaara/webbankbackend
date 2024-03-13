
const Account = require('../models/account');

const accountsRouter = require('express').Router();

accountsRouter.get('/', async (request, response) => {
    const accounts = await Account.findAll();
    response.json(accounts);
});

accountsRouter.get('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    const account = accounts.find(account => account.id === id);
    if (account) {
      response.json(account);
    } else {
      response.status(404).end();
    }
    next(error);
});

accountsRouter.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    accounts = accounts.filter(account => account.id !== id);
  
    response.status(204).end();
    next(error);
});

accountsRouter.post('/', (request, response) => {
  
    const maxId = accounts.length > 0
      ? Math.max(...accounts.map(n => n.id)) 
      : 0
  
    const account = request.body;
    account.id = maxId + 1;
  
    accounts = accounts.concat(account);
  
    response.json(account);
});

module.exports = accountsRouter;
