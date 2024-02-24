
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

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>')
});

app.get('/api/users', (request, response) => {
  response.json(users)
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
