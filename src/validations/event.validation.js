const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEvent = {
  body: Joi.object().keys({
    owner: Joi.string().custom(objectId).required(),
    title: Joi.string().required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
    color: Joi.string().required(),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
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
