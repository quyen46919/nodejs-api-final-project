const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBoard = {
  body: Joi.object().keys({
    owner: Joi.string().custom(objectId),
    title: Joi.string().required(),
    columnOrder: Joi.array(),
    column: Joi.array(),
    lastUpdated: Joi.date(),
    isFavorite: Joi.boolean(),
    sharedUserList: Joi.array(),
  }),
};

const getBoards = {
  query: Joi.object().keys({
    title: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBoard = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateBoard = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      columnOrder: Joi.array().items(Joi.custom(objectId)),
      column: Joi.array().items(Joi.object().keys().min(1)),
      lastUpdated: Joi.date(),
      isFavorite: Joi.boolean(),
      sharedUserList: Joi.array().items(Joi.custom(objectId)),
    })
    .min(1),
};

const deleteBoard = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard,
};
