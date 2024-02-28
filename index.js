
const express = require('express');
const app = express();
const cors = require('cors');

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

app.use(cors());
app.use(express.json());

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('   ');
    next();
};

app.use(requestLogger);

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>');
});

app.get('/api/users', (request, response) => {
  response.json(users);
});

app.get('/api/users/:id', (request, response) => {
  const id = Number(request.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/users/:id', (request, response) => {
  const id = Number(request.params.id);
  users = users.filter(user => user.id !== id);

  response.status(204).end();
});

app.post('/api/users', (request, response) => {

  const maxId = users.length > 0
    ? Math.max(...users.map(n => n.id)) 
    : 0

  const user = request.body;
  user.id = maxId + 1;

  users = users.concat(user);

  response.json(user);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
};
  
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
