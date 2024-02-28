
const usersRouter = require('express').Router();

let users = [
    {
      id: 1,
      user: "59990001",
      firstname: "Markku",
      middlename: "Tapio",
      lastname: "Vaara",
      password: "Seppo2016"
    }
]

usersRouter.get('/', (request, response) => {
    response.json(users);
  });

usersRouter.get('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
    next(error);
});

usersRouter.delete('/:id', (request, response, next) => {
    const id = Number(request.params.id);
    users = users.filter(user => user.id !== id);
  
    response.status(204).end();
    next(error);
});

usersRouter.post('/', (request, response) => {
  
    const maxId = users.length > 0
      ? Math.max(...users.map(n => n.id)) 
      : 0
  
    const user = request.body;
    user.id = maxId + 1;
  
    users = users.concat(user);
  
    response.json(user);
});

module.exports = usersRouter;
