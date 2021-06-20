const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateProfile,
  updateProfileAvatar,
  getUserMe,
} = require('../controllers/user');
const {
  idValidation,
  updateUserValidation,
  avatarValidation,
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:id', idValidation, getUserId);
router.patch('/me', updateUserValidation, updateProfile);
router.patch('/me/avatar', avatarValidation, updateProfileAvatar);

module.exports = router;
