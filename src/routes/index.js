const router = require('express').Router();
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const courseRouter = require('./course.router');
const materialRouter = require('./material.router');
const contentRouter = require('./content.router');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/courses', courseRouter);
router.use('/materials', materialRouter);
router.use('/contents', contentRouter);

module.exports = router;