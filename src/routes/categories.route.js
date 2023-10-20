const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories.controller');
const { ensureAuth } = require('../middleware/auth');
const { categoryValidation, validate } = require('../../validation.js');
router.get('/', ensureAuth, categoryController.getAllCategories);
router.get('/:id', ensureAuth, categoryController.getOneCategory);
router.post('/', ensureAuth, categoryValidation, validate, categoryController.createCategory);
router.put('/:id', ensureAuth, categoryValidation, validate, categoryController.updateCategory);
router.delete('/:id', ensureAuth, categoryController.deleteCategory);

module.exports = router;
