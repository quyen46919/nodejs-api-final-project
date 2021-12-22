const express = require('express');
const cardController = require('../../controllers/card.controller');
const validate = require('../../middlewares/validate');
const { cardValidation } = require('../../validations');

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

router.route('/delete/:columnId').delete(validate(cardValidation.deleteManyCard), cardController.deleteManyCard);

module.exports = router;
