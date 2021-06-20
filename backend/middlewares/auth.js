const jwt = require('jsonwebtoken');
const { InvalidToken } = require('./errors');

const { JWT_SECRET = 'dev-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Вы не авторизованы' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new InvalidToken('Некорректный токен'));
    }
    next(err);
  }
  req.user = payload;
  next();
};
