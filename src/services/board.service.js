const httpStatus = require('http-status');
const { Board } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} boardBody
 * @returns {Promise<Board>}
 */
const createBoard = async (boardBody) => {
  return Board.create(boardBody);
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
  const board = await getBoardById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  }

  Object.assign(board, updateBody);
  await board.save();
  return board;
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
  getBoardById,
  getBoardByEmail,
  updateBoardById,
  deleteBoardById,
};
