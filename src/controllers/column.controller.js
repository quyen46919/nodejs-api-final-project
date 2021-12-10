const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { columnService } = require('../services');

const createColumn = catchAsync(async (req, res) => {
  const column = await columnService.createColumn(req.body);
  res.status(httpStatus.CREATED).send(column);
});

const getColumns = catchAsync(async (req, res) => {
  const result = await columnService.queryColumns();
  res.send(result);
});

const getColumn = catchAsync(async (req, res) => {
  const column = await columnService.getColumnById(req.params.id);
  if (!column) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Column not found');
  }
  res.send(column);
});

const updateColumn = catchAsync(async (req, res) => {
  const column = await columnService.updateColumnById(req.params.id, req.body);
  res.send(column);
});

const deleteColumn = catchAsync(async (req, res) => {
  await columnService.deleteColumnById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createColumn,
  getColumns,
  getColumn,
  updateColumn,
  deleteColumn,
};
