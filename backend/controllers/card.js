const Card = require('../model/card');
const {
  NotFoundError,
  ValidationError,
  OwnerError,
} = require('../middlewares/errors');
// Создание карточки
module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Неккоректные данные'));
      }
      next(err);
    });
};
// Получить все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail(new Error('NotFound'))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Карточки не найдены'));
      }
      next(err);
    });
};
// Удаление карточки по id
module.exports.deleteCardsOnId = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new Error('NotFound'))
    .then((card) => {
      if (req.user._id.toString() === card.owner.toString()) {
        card.remove();
        res.status(200).send({ message: 'Карточка удалена' });
      }
      throw new OwnerError('Карточка не принадлежит Вам');
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка не найдена'));
      } if (err.name === 'CastError') {
        next(new ValidationError('Некорректные данные'));
      }
      next(err);
    });
};
// Постановка лайка
module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка не найденa'));
      } if (err.name === 'CastError') {
        next(new ValidationError('Некорректные данные'));
      }
      next(err);
    });
};
// Снятие лайка
module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка не найденa'));
      } if (err.name === 'CastError') {
        next(new ValidationError('Некорректные данные'));
      }
      next(err);
    });
};
