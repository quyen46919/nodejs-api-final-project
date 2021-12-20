const express = require('express');
const eventController = require('../../controllers/event.controller');
const eventValidation = require('../../validations/event.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

router
  .route('/')
  .post(validate(eventValidation.createEvent), eventController.createEvent)
  .get(validate(eventValidation.getEvents), eventController.getEvents);

router
  .route('/:Id')
  .get(validate(eventValidation.getEvent), eventController.getEvent)
  .patch(validate(eventValidation.updateEvent), eventController.updateEvent)
  .delete(validate(eventValidation.deleteEvent), eventController.deleteEvent);

module.exports = router;
