const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routers/index');
const { login, createUser } = require('./controllers/user');
const { userValidation, loginValidation } = require('./middlewares/validate');
const { serverError } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
app.use(cors({ origin: '*' }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(requestLogger);
app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);
app.use(router);
app.use(errorLogger);
// eslint-disable-next-line no-unused-vars
app.use(serverError);

app.listen(PORT);