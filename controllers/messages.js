
const { Message } = require('../models/index');

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

messagesRouter.delete('/:id', async (request, response, next) => {
    const id = Number(request.params.id);
    const message = await Message.destroy({where:{id: id}});
    if (message) {
      response.json(message);
    } else {
      response.status(404).end();
    }
});

messagesRouter.post('/', async (request, response) => {
  
    try {
      const message = await Message.create(request.body);
      response.json(message);
    } catch(error) {
      console.log(error);
     return response.status(400).json({ error });
    }

});

messagesRouter.put('/:id', async (request, response) => {

  try {
    const message = await Message.findByPk(request.params.id);

    if (request.body.read == true) {
      message.read = true;
    }
    
    await message.save();
    response.json(message);

  } catch(error) {
    console.log(error);
    return response.status(400).json({ error });
  }
});

module.exports = messagesRouter;
