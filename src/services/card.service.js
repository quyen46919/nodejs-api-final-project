const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Card, Column } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a card
 * @param {Object} cardBody
 * @returns {Promise<Card>}
 */
const createCard = async (cardBody) => {
  return Card.create(cardBody);
};
// /**
//  * Query for cards
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
const queryCards = async () => {
  const cards = await Card.find();
  return cards;
};

/**
 * Get card by id
 * @param {ObjectId} id
 * @returns {Promise<Card>}
 */
const getCardById = async (id) => {
  return Card.findById(id);
};

/**
 * Get card by email
 * @param {string} title
 * @returns {Promise<Card>}
 */
const getCardByTitle = async (title) => {
  return Card.findOne({ title });
};

/**
 * Update card by id
 * @param {ObjectId} Id
 * @param {Object} updateBody
 * @returns {Promise<Card>}
 */
const updateCardById = async (Id, updateBody) => {
  const card = await getCardById(Id);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Card not found');
  }
  // eslint-disable-next-line no-param-reassign
  updateBody.columnId = mongoose.Types.ObjectId(updateBody.columnId);
  Object.assign(card, updateBody);
  await card.save();
  return card;
};

/**
 * Delete card by id
 * @param {ObjectId} Id
 * @returns {Promise<Card>}
 */
const deleteCardById = async (Id) => {
  const card = await getCardById(Id);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Card not found');
  }
  await card.remove();
  return card;
};

/**
 * Delete many card by columnId
 * @param {Array of string card id} Id
 */
const deleteManyCard = async (columnId) => {
  await Card.deleteMany({ columnId });
  await Column.findByIdAndUpdate(columnId, { cardOrder: [] });
};

module.exports = {
  createCard,
  queryCards,
  getCardById,
  getCardByTitle,
  updateCardById,
  deleteCardById,
  deleteManyCard,
};
