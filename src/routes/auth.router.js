const router = require('express').Router();
const authController = require('../controllers/auth.controllers');
const { restrict } = require('../middlewares/auth.middlewares');

router.post('/login', authController.login);
router.get('/me', restrict, authController.me);

module.exports = router;