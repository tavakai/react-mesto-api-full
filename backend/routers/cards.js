const router = require('express').Router();
const {
  getCards,
  createCards,
  deleteCardsOnId,
  addLike,
  removeLike,
} = require('../controllers/card');
const {
  idValidation,
  cardValidation,
} = require('../middlewares/validate');

router.get('/', getCards);
router.post('/', cardValidation, createCards);
router.delete('/:id', idValidation, deleteCardsOnId);
router.put('/:id/likes', idValidation, addLike);
router.delete('/:id/likes', idValidation, removeLike);

module.exports = router;
