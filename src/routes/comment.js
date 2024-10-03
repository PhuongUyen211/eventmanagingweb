const express = require('express');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

const commentController = require('../app/controllers/CommentController');

router.post('/:id/add', authenticate, commentController.addComment);
router.get('/:id/get', commentController.getComment);

module.exports = router;
