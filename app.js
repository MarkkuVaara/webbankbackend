
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const usersRouter = require('./controllers/users');
const accountsRouter = require('./controllers/accounts');
const transactionsRouter = require('./controllers/transactions');
const messagesRouter = require('./controllers/messages');
const loginRouter = require('./controllers/login');
const predictRouter = require('./controllers/predict');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(middleware.requestLogger);
app.use(express.static('dist'));

app.use('/api/users', usersRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/login', loginRouter);
app.use('/api/predict', predictRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
