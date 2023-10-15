const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments.controller');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, commentController.getAllComments);
router.get('/:id', ensureAuth, commentController.getOneComment);
router.post('/', ensureAuth, commentController.createComment);
router.put('/:id', ensureAuth, commentController.updateComment);
router.delete('/:id', ensureAuth, commentController.deleteComment);

module.exports = router;
