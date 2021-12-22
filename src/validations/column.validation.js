const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createColumn = {
  body: Joi.object().keys({
    boardId: Joi.string().custom(objectId).required(),
    title: Joi.string(),
    isFavorite: Joi.boolean(),
    columnOrder: Joi.array(),
    cardOrder: Joi.array(),
  }),
};

const queryColumns = {
  query: Joi.object().keys({
    title: Joi.string(),
  }),
};

const queryColumn = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateColumn = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      isFavorite: Joi.boolean(),
      cardOrder: Joi.array().items(Joi.custom(objectId)),
    })
    .min(1),
};

const deleteColumn = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createColumn,
  queryColumns,
  queryColumn,
  updateColumn,
  deleteColumn,
};
