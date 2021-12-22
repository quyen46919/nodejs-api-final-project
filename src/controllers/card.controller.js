const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cardService, columnService } = require('../services');

const createCard = catchAsync(async (req, res) => {
  const card = await cardService.createCard(req.body);

  // update columnOrder
  await columnService.pushCardOrder(card.columnId.toString(), card._id.toString());
  res.status(httpStatus.CREATED).send(card);
});

const getCards = catchAsync(async (req, res) => {
  const result = await cardService.queryCards();
  res.send(result);
});

const getCard = catchAsync(async (req, res) => {
  const card = await cardService.getCardById(req.params.Id);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Card not found');
  }
  res.send(card);
});

const updateCard = catchAsync(async (req, res) => {
  const card = await cardService.updateCardById(req.params.Id, req.body);
  res.send(card);
});

const deleteCard = catchAsync(async (req, res) => {
  await cardService.deleteCardById(req.params.Id);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteManyCard = catchAsync(async (req, res) => {
  await cardService.deleteManyCard(req.params.columnId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCard,
  getCards,
  getCard,
  updateCard,
  deleteCard,
  deleteManyCard,
};
