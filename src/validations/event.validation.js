const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEvent = {
  body: Joi.object().keys({
    ownerId: Joi.string().custom(objectId).required(),
    title: Joi.string(),
    start: Joi.string(),
    end: Joi.string(),
    color: Joi.string(),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    title: Joi.string(),
    start: Joi.string(),
    end: Joi.string(),
    color: Joi.string(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    Id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      start: Joi.string(),
      end: Joi.string(),
      color: Joi.string(),
    })
    .min(1),
};

const deleteEvent = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
