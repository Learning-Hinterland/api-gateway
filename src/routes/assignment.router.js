const router = require('express').Router();
const assignmentController = require('../controllers/assignment.controllers');
const { restrict, isLecturer } = require('../middlewares/auth.middlewares');

router.post('/', restrict, assignmentController.createAssignment);
router.get('/', restrict, assignmentController.getAssignments);
router.get('/:id', restrict, assignmentController.getAssignmentById);
router.post('/:id/submit', restrict, assignmentController.submitAssignment);

module.exports = router;