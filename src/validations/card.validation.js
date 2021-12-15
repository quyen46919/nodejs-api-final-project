const Joi = require('joi');
// eslint-disable-next-line import/no-unresolved
const { objectId } = require('./custom.validation');

const createCard = {
  body: Joi.object().keys({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
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
      title: Joi.string(),
      content: Joi.string(),
    })
    .min(1),
};

const deleteCard = {
  params: Joi.object().keys({
    Id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCard,
  getCards,
  getCard,
  updateCard,
  deleteCard,
};
