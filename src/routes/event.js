const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const eventController = require('../app/controllers/EventController');

router.post('/create', authenticate, eventController.create);
router.post('/:id/join', authenticate, eventController.join);
router.post('/:id/Unjoin', authenticate, eventController.Unjoin);
router.post('/:id/edit', authenticate, eventController.checkEventHost, eventController.editEvent);
router.delete('/:id/cancel', authenticate, eventController.checkEventHost, eventController.cancelEvent);
router.get('/search', eventController.searchEvent);
router.get('/eventJoined', authenticate, eventController.getEventJoined);
router.get('/eventCreated', authenticate, eventController.getEventCreated);


module.exports = router;
