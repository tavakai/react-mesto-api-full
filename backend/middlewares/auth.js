const jwt = require('jsonwebtoken');
const { InvalidToken } = require('./errors');

const { JWT_SECRET = 'dev-key', NODE_ENV } = process.env;

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const cookie = req.cookies.jwt;

  if (!cookie) {
    next(new InvalidToken('Необходима авторизация'));
  }
  const token = cookie.replace('jwt', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new InvalidToken('Некорректный токен'));
    }
    next(err);
  }
  req.user = payload;
  next();
};
