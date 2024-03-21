
const { Transaction } = require('../models/index');

const transactionsRouter = require('express').Router();

transactionsRouter.get('/', async (request, response) => {
    const transactions = await Transaction.findAll();
    response.json(transactions);
});

transactionsRouter.get('/:id', async (request, response, next) => {
    const id = Number(request.params.id);
    const transaction = await Transaction.findByPk(id);
    if (transaction) {
      response.json(transaction);
    } else {
      response.status(404).end();
    }
});

/* transactionsRouter.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    transactions = transactions.filter(transaction => transaction.id !== id);
  
    response.status(204).end();
    next(error);
}); */

transactionsRouter.post('/', async (request, response) => {

    try {
      const transaction = await Transaction.create(request.body);
      response.json(transaction);
    } catch(error) {
      console.log(error);
      return response.status(400).json({ error });
    }

});

module.exports = transactionsRouter;
