const express = require('express');
const cardController = require('../../controllers/card.controller');

const router = express.Router();

router.route('/').post(cardController.createCard).get(cardController.getCards);

router.route('/:Id').get(cardController.getCard).patch(cardController.updateCard).delete(cardController.deleteCard);

module.exports = router;
