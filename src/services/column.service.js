const httpStatus = require('http-status');
const { Column } = require('../models');
const ApiError = require('../utils/ApiError');
// eslint-disable-next-line import/order
const mongoose = require('mongoose');

/**
 * Create a column
 * @param {Object} columnBody
 * @returns {Promise<Column>}
 */
const createColumn = async (columnBody) => {
  return Column.create(columnBody);
};

const pushCardOrder = async (columnId, cardId) => {
  const result = await Column.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(columnId) },
    { $push: { cardOrder: cardId } },
    { returnOriginal: false }
  );
  return result;
};

/**
 * Query for Columns
 * @returns {Promise<QueryResult>}
 */
const queryColumns = async () => {
  const columns = await Column.find();
  return columns;
};

/**
 * Get Column by id
 * @param {ObjectId} id
 * @returns {Promise<Column>}
 */
const getColumnById = async (id) => {
  return Column.findById(id);
};

/**
 * Update Column by id
 * @param {ObjectId} ColumnId
 * @param {Object} updateBody
 * @returns {Promise<Column>}
 */
const updateColumnById = async (columnId, updateBody) => {
  const column = await getColumnById(columnId);
  if (!column) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Column not found');
  }

  Object.assign(column, updateBody);
  await column.save();
  return column;
};

/**
 * Delete Column by id
 * @param {ObjectId} columnId
 * @returns {Promise<Column>}
 */
const deleteColumnById = async (columnId) => {
  const column = await getColumnById(columnId);
  if (!column) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Column not found');
  }
  await column.remove();
  return column;
};

module.exports = {
  createColumn,
  queryColumns,
  pushCardOrder,
  getColumnById,
  updateColumnById,
  deleteColumnById,
};
