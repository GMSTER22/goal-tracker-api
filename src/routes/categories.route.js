const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories.controller');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getOneCategory);
router.post('/', categoryController.createCategory);

module.exports = router;