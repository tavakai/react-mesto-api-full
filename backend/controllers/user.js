const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/users');
const {
  NotFoundError,
  ValidationError,
  ConflictError,
} = require('../middlewares/errors');

const { JWT_SECRET = 'dev-key', NODE_ENV } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Неправильный логин или пароль' });
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(401).send({ message: 'Неправильный логин или пароль' });
          }
          return user;
        })
        // eslint-disable-next-line no-shadow
        .then((user) => {
          const token = jwt.sign(
            {
              _id: user._id,
            },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          });
          res.status(200).send({ token });
        });
    })
    .catch(next);
};

module.exports.logOut = (req, res, next) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: 'You unauthorized' });
  next();
};

// Получить всех пользователей
module.exports.getUsers = (req, res, next) => {
  (async () => {
    try {
      const users = await User.find({})
        .orFail(new Error('NotFound'));
      res.status(200).send({ users });
    } catch (error) {
      if (error.message === 'NotFound') {
        next(new NotFoundError('Пользователи не найдены'));
      }
      next(error);
    }
  })();
};
// Информация о текущем пользователе
module.exports.getUserMe = (req, res, next) => {
  const { _id } = req.user;
  (async () => {
    try {
      const user = await User.findOne({ _id })
        .orFail(new Error('NotFound'));
      res.status(200).send(user);
    } catch (err) {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователь не найден'));
      } if (err.name === 'CastError') {
        next(new ValidationError('Некорректный токен'));
      }
      next(err);
    }
  })();
};
// Получить пользователя по id
module.exports.getUserId = (req, res, next) => {
  (async () => {
    try {
      const user = await User.findById(req.params.id).orFail(new Error('NotFound'));
      res.status(200).send(user);
    } catch (err) {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователь с таким ID не найден'));
        // res.status(404).send({ message: 'Пользователь с таким ID не найден' });
      } if (err.name === 'CastError') {
        next(new ValidationError('Некорректный токен'));
      }
      next(err);
    }
  })();
};
// Создать пользователя
module.exports.createUser = (req, res, next) => {
  (async () => {
    const {
      name, about, avatar, email, password,
    } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      const createUser = await User.create({
        name, about, avatar, email, password: hash,
      });
      const user = await User.findOne(createUser).select('-password').select('-__v');
      res.status(201).send(user);
    } catch (err) {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные логин или пароль'));
      } if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует'));
      }
      next(err);
    }
  })();
};
// Обновить информацию профиля
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователь не найден'));
      }
      next(err);
    });
};
// Обновить аватарку пользователя
module.exports.updateProfileAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('URL is not valid'));
      } if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователь не найден'));
      }
      next(err);
    });
};
