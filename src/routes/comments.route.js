const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments.controller');

router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getOneComment);
router.post('/', commentController.createComment);

module.exports = router;