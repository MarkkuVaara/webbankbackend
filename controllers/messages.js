
const Message = require('../models/message');

const messagesRouter = require('express').Router();

messagesRouter.get('/', async (request, response) => {
    const messages = await Message.findAll();
    response.json(messages);
});

messagesRouter.get('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    const message = messages.find(message => message.id === id);
    if (message) {
      response.json(message);
    } else {
      response.status(404).end();
    }
    next(error);
});

messagesRouter.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    messages = messages.filter(message => message.id !== id);
  
    response.status(204).end();
    next(error);
});

messagesRouter.post('/', (request, response) => {
  
    const maxId = messages.length > 0
      ? Math.max(...messages.map(n => n.id)) 
      : 0
  
    const message = request.body;
    message.id = maxId + 1;
  
    messages = messages.concat(message);
  
    response.json(message);
});

module.exports = messagesRouter;
