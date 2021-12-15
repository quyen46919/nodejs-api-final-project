const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNote = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const getNotes = {
  query: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
  }),
};

const getNote = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

const updateNote = {
  params: Joi.object().keys({
    Id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      content: Joi.string(),
    })
    .min(1),
};

const deleteNote = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
