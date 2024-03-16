
const Message = require('../models/message');

const messagesRouter = require('express').Router();

messagesRouter.get('/', async (request, response) => {
    const messages = await Message.findAll();
    response.json(messages);
});

messagesRouter.get('/:id', async (request, response, next) => {
    const id = Number(request.params.id);
    const message = await Message.findByPk(id);
    if (message) {
      response.json(message);
    } else {
      response.status(404).end();
    }
});

messagesRouter.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    messages = messages.filter(message => message.id !== id);
  
    response.status(204).end();
    next(error);
});

messagesRouter.post('/', async (request, response) => {
  
    const message = await Message.create(request.body);
    response.json(message);

});

module.exports = messagesRouter;
