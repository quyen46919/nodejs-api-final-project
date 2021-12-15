const express = require('express');
const noteController = require('../../controllers/note.controller');
const noteValidation = require('../../validations/note.validation');
const { validate } = require('../../models/note.model');

const router = express.Router();

router
  .route('/')
  .post(validate(noteValidation.createNote), noteController.createNote)
  .get(validate(noteValidation.getNotes), noteController.getNotes);

router
  .route('/:Id')
  .get(validate(noteValidation.getNote), noteController.getNote)
  .patch(validate(noteValidation.updateNote), noteController.updateNote)
  .delete(validate(noteValidation.deleteNote), noteController.deleteNote);

module.exports = router;
