const express = require('express');
const validate = require('../../middlewares/validate');
const boardValidation = require('../../validations/board.validation');
const boardController = require('../../controllers/board.controller');

const router = express.Router();

router.post('/', validate(boardValidation.createBoard), boardController.createBoard);
router.patch('/:id', validate(boardValidation.updateBoard), boardController.updateBoard);
router.delete('/:id', validate(boardValidation.deleteBoard), boardController.deleteBoard);
router.get('/', validate(boardValidation.getBoards), boardController.getBoards);
router.get('/:id', validate(boardValidation.getBoard), boardController.getBoard);

module.exports = router;
