const router = require('express').Router();
const courseController = require('../controllers/course.controllers');
const materialController = require('../controllers/material.controllers');
const { restrict, isLecturer } = require('../middlewares/auth.middlewares');

router.post('/', restrict, isLecturer, courseController.createCourse);
router.get('/', restrict, courseController.getCourses);
router.get('/:id', restrict, courseController.getCourseById);
router.put('/:id', restrict, isLecturer, courseController.updateCourse);
router.delete('/:id', restrict, isLecturer, courseController.deleteCourse);

router.post('/:id/enroll', restrict, courseController.enrollCourse);
router.delete('/:id/unenroll', restrict, courseController.unenrollCourse);

module.exports = router;