const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCard = {
  body: Joi.object().keys({
    columnId: Joi.string().custom(objectId).required(),
    boardId: Joi.string().custom(objectId).required(),
    title: Joi.string().allow(null, ''),
    content: Joi.string().allow(null, ''),
    cover: Joi.string(),
  }),
};

const getCards = {
  query: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
  }),
};

const getCard = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

const updateCard = {
  params: Joi.object().keys({
    Id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      columnId: Joi.custom(objectId),
    })
    .min(1),
};

const deleteCard = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

const deleteManyCard = {
  params: Joi.object().keys({
    columnId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCard,
  getCards,
  getCard,
  updateCard,
  deleteCard,
  deleteManyCard,
};
