const router = require('express').Router();
const userController = require('../controllers/user.controllers');
const { restrict, isAdmin } = require('../middlewares/auth.middlewares');

router.get('/', restrict, userController.getUsers);
router.post('/', restrict, isAdmin, userController.createUser);
router.get('/:id', restrict, userController.getUserById);

module.exports = router;