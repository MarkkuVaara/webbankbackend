
const messagesRouter = require('express').Router();

let messages = [
    {
      id: 1,
      title: "Otsikko",
      date: "02/05/2024",
      message: "Liplap blaablaa ipsum",
      userid: 1
    }
]

messagesRouter.get('/', (request, response) => {
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
