const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const userController = require('../app/controllers/UserController');

router.post('/edit', authenticate, userController.editProfile);
router.delete('/delete', authenticate, userController.deleteUser);

module.exports = router;
