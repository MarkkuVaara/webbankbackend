
const express = require('express');
const app = express();

let users = [
  {
    user: "59990001",
    firstname: "Markku",
    middlename: "Tapio",
    lastname: "Vaara",
    password: "Seppo2016"
  }
]

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
  response.send('<h1>Hello world!</h1>')
});

app.get('/api/users', (request, response) => {
  response.json(users)
});

app.post('/api/users', (request, response) => {
    const user = request.body;
    console.log(user);
    response.json(user);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
};
  
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
