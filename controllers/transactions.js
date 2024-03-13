
const Transaction = require('../models/transaction');

const transactionsRouter = require('express').Router();

transactionsRouter.get('/', async (request, response) => {
    const transactions = await Transaction.findAll();
    response.json(transactions);
});

transactionsRouter.get('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    const transaction = transactions.find(transaction => transaction.id === id);
    if (transaction) {
      response.json(transaction);
    } else {
      response.status(404).end();
    }
    next(error);
});

transactionsRouter.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    transactions = transactions.filter(transaction => transaction.id !== id);
  
    response.status(204).end();
    next(error);
});

transactionsRouter.post('/', (request, response) => {
  
    const maxId = transactions.length > 0
      ? Math.max(...transactions.map(n => n.id)) 
      : 0
  
    const transaction = request.body;
    transaction.id = maxId + 1;
  
    transactions = transactions.concat(transaction);
  
    response.json(transaction);
});

module.exports = transactionsRouter;
