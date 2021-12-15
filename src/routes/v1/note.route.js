const express = require('express');
const noteController = require('../../controllers/note.controller');

const router = express.Router();

router.route('/').post(noteController.createNote).get(noteController.getNotes);

router.route('/:Id').get(noteController.getNote).patch(noteController.updateNote).delete(noteController.deleteNote);

module.exports = router;
