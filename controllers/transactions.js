
const { Transaction, User, Account } = require('../models/index');

const transactionsRouter = require('express').Router();
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

transactionsRouter.post('/', tokenExtractor, async (request, response) => {

    try {
      const account = await Account.findByPk(request.body.accountidd);
      const user = await User.findByPk(request.decodedToken.id);
      const accountuser = await User.findByPk(account.userId);
      if (account.userId == user.id) {
        const transaction = await Transaction.create({...request.body, accountId: account.id, date: new Date()});
        response.json(transaction);
      } else if (user && accountuser) {
        const transaction = await Transaction.create({...request.body, accountId: account.id, date: new Date()});
        response.json(transaction);
      } else {
        response.json({});
      }
    } catch(error) {
      console.log(error);
      return response.status(400).json({ error });
    }

});

transactionsRouter.put('/:id', tokenExtractor, async (request, response) => {

  try {
    const transaction = await Transaction.findByPk(request.params.id);
    const account = await Account.findByPk(request.body.accountidd);
    const user = await User.findByPk(request.decodedToken.id);

    if (request.body.pending == true) {
      transaction.pending = true;
    }
    if (request.body.pending == false) {
      transaction.pending = false;
    }
    
    if (account.userId == user.id) {
      await transaction.save();
      response.json(transaction);
    } else {
      response.json({});
    }

  } catch(error) {
    console.log(error);
    return response.status(400).json({ error });
  }
});

module.exports = transactionsRouter;
