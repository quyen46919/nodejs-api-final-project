const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Board, Column, Card } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} boardBody
 * @returns {Promise<Board>}
 */
const createBoard = async (boardBody) => {
  return Board.create(boardBody);
};

const pushColumnOrder = async (boardId, columnId) => {
  const result = await Board.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(boardId) },
    { $push: { columnOrder: columnId } },
    { returnOriginal: false }
  );
  return result;
};

/**
 * Query for Boards
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBoards = async (filter, options) => {
  const boards = await Board.paginate(filter, options);
  return boards;
};

const queryAllBoardsByUserId = async (userId) => {
  const boards = await Board.find({ owner: mongoose.Types.ObjectId(userId) });
  return boards;
};

const getFullBoards = async (boardId) => {
  const boards = await Board.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(boardId),
      },
    },
    {
      $lookup: {
        from: Column.collection.name,
        localField: '_id',
        foreignField: 'boardId',
        as: 'columns',
      },
    },
    {
      $lookup: {
        from: Card.collection.name,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards',
      },
    },
    {
      $addFields: {
        id: '$_id',
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  return boards[0];
};

/**
 * Get Board by id
 * @param {ObjectId} id
 * @returns {Promise<Board>}
 */
const getBoardById = async (id) => {
  return Board.findById(id);
};

/**
 * Get Board by email
 * @param {string} email
 * @returns {Promise<Board>}
 */
const getBoardByEmail = async (email) => {
  return Board.findOne({ email });
};

/**
 * Update Board by id
 * @param {ObjectId} BoardId
 * @param {Object} updateBody
 * @returns {Promise<Board>}
 */
const updateBoardById = async (boardId, updateBody) => {
  // const board = await getBoardById(boardId);
  // if (!board) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  // }

  // Object.assign(board, updateBody);
  // await board.save();
  // return board;

  const result = await Board.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(boardId) },
    { $set: updateBody },
    { returnOriginal: false }
  );
  return result;
};

/**
 * Delete Board by id
 * @param {ObjectId} boardId
 * @returns {Promise<Board>}
 */
const deleteBoardById = async (boardId) => {
  const board = await getBoardById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  }
  await board.remove();
  return board;
};

module.exports = {
  createBoard,
  queryBoards,
  queryAllBoardsByUserId,
  getFullBoards,
  pushColumnOrder,
  getBoardById,
  getBoardByEmail,
  updateBoardById,
  deleteBoardById,
};
