const router = require('express').Router();
const createContent = require('../controllers/content.controllers');
const { restrict, isLecturer } = require('../middlewares/auth.middlewares');

router.post('/', restrict, isLecturer, createContent.createContent);
router.get('/', restrict, createContent.getContents);
router.get('/:id', restrict, createContent.getContentById);
router.put('/:id', restrict, isLecturer, createContent.updateContent);
router.delete('/:id', restrict, isLecturer, createContent.deleteContent);

module.exports = router;