const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const eventController = require('../app/controllers/EventController');

router.post('/create', authenticate, eventController.create);
router.post('/:id/join', authenticate, eventController.join);
router.post('/:id/Unjoin', authenticate, eventController.Unjoin);
router.put('/:id/edit', authenticate, eventController.checkEventHost, eventController.editEvent);
router.delete('/:id/cancel', authenticate, eventController.checkEventHost, eventController.cancelEvent);
router.get('/:id/get', eventController.getEvent);


module.exports = router;
