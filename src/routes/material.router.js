const router = require('express').Router();
const materialController = require('../controllers/material.controllers');
const { restrict, isLecturer } = require('../middlewares/auth.middlewares');

router.post('/', restrict, isLecturer, materialController.createMaterial);
router.get('/', restrict, materialController.getMaterials);
router.get('/:id', restrict, materialController.getMaterialById);
router.put('/:id', restrict, isLecturer, materialController.updateMaterial);
router.delete('/:id', restrict, isLecturer, materialController.deleteMaterial);

module.exports = router;