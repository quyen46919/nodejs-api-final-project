const express = require('express');
const cardController = require('../../controllers/card.controller');
const cardValidation = require('../../validations/card.validation');
const { validate } = require('../../models/card.model');

const router = express.Router();
router
  .route('/')
  .post(validate(cardValidation.createCard), cardController.createCard)
  .get(validate(cardValidation.getCards), cardController.getCards);

router
  .route('/:Id')
  .get(validate(cardValidation.getCard), cardController.getCard)
  .patch(validate(cardValidation.updateCard), cardController.updateCard)
  .delete(validate(cardValidation.deleteCard), cardController.deleteCard);

module.exports = router;
