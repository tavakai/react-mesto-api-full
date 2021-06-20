const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../middlewares/errors');

router.use(auth);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardsRouter);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
