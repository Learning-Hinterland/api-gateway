const router = require('express').Router();
const authController = require('../controllers/auth.controllers');
const { restrict } = require('../middlewares/auth.middlewares');

router.post('/login', authController.login);
router.get('/me', restrict, authController.me);
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password', (req, res) => {
    let { token, error } = req.query;
    return res.render('reset-password', { token, error });
});
router.post('/reset-password', authController.resetPassword);
router.post('/update-password', restrict, authController.updatePassword);

module.exports = router;