const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments.controller');

router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getOneComment);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
