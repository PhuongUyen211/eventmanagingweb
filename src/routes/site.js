const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const siteController = require('../app/controllers/SiteController');

router.get('/notifications', authenticate, siteController.getUserNotification);
router.get('/', siteController.index);

module.exports = router;
