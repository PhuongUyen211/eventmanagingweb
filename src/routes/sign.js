const express = require('express');
const router = express.Router();

const signController = require('../app/controllers/SignController');

router.post('/signUp', signController.register);
router.post('/signIn', signController.login);
router.post('/forgotPw', signController.forgotPw);
router.post('/resetPw', signController.resetPw);

module.exports = router;
