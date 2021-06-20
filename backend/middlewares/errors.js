/* eslint-disable max-classes-per-file */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class InvalidToken extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class OwnerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

// eslint-disable-next-line no-unused-vars
function serverError(err, req, res, next) {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'Произошла ошибка app' : message,
  });
}

module.exports = {
  NotFoundError,
  ValidationError,
  InvalidToken,
  OwnerError,
  ConflictError,
  serverError,
};
