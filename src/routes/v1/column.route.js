const express = require('express');
const validate = require('../../middlewares/validate');
const columnValidation = require('../../validations/column.validation');
const columnController = require('../../controllers/column.controller');

const router = express.Router();

router.post('/', validate(columnValidation.createColumn), columnController.createColumn);
router.patch('/:id', validate(columnValidation.updateColumn), columnController.updateColumn);
router.delete('/:id', validate(columnValidation.deleteColumn), columnController.deleteColumn);
router.get('/', validate(columnValidation.queryColumns), columnController.getColumns);

module.exports = router;
