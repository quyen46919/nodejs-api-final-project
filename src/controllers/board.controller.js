const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { boardService } = require('../services');

const createBoard = catchAsync(async (req, res) => {
  const board = await boardService.createBoard(req.body);
  res.status(httpStatus.CREATED).send(board);
});

const getBoards = catchAsync(async (req, res) => {
  // console.log(req.body);
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const boards = await boardService.queryAllBoardsByUserId(req.query.id);
  res.send(boards);
});

const getBoard = catchAsync(async (req, res) => {
  // const board = await boardService.getBoardById(req.params.id);
  const boards = await boardService.getFullBoards(req.params.id);

  // change all _id to id
  boards.columns.forEach((column) => {
    // eslint-disable-next-line no-param-reassign
    column.id = column._id;
    // eslint-disable-next-line no-param-reassign
    delete column._id;
  });
  boards.cards.forEach((card) => {
    // eslint-disable-next-line no-param-reassign
    card.id = card._id;
    // eslint-disable-next-line no-param-reassign
    delete card._id;
  });

  boards.columns.forEach((column) => {
    // eslint-disable-next-line no-param-reassign
    column.cards = boards.cards.filter((c) => c.columnId.toString() === column.id.toString());
  });
  // Sort step will pass to Frontend
  delete boards.cards;

  if (!boards) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Board not found');
  }
  res.send(boards);
});

const updateBoard = catchAsync(async (req, res) => {
  delete req.body.id;
  const board = await boardService.updateBoardById(req.params.id, req.body);
  res.send(board);
});

const deleteBoard = catchAsync(async (req, res) => {
  await boardService.deleteBoardById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard,
};
