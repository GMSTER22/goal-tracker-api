const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories.controller');
const { ensureAuth } = require('../middleware/auth');
router.get('/', ensureAuth, categoryController.getAllCategories);
router.get('/:id', ensureAuth, categoryController.getOneCategory);
router.post('/', ensureAuth, categoryController.createCategory);
router.put('/:id', ensureAuth, categoryController.updateCategory);
router.delete('/:id', ensureAuth, categoryController.deleteCategory);

module.exports = router;
