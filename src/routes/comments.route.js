const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments.controller');
const { ensureAuth } = require('../middleware/auth');
const { commentValidation, validate } = require('../../validation.js');

router.get('/', ensureAuth, commentController.getAllComments);
router.get('/:id', ensureAuth, commentController.getOneComment);
router.post('/', ensureAuth, commentValidation, validate, commentController.createComment);
router.put('/:id', ensureAuth, commentValidation, validate, commentController.updateComment);
router.delete('/:id', ensureAuth, commentController.deleteComment);

module.exports = router;
