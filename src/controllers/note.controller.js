const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { noteService } = require('../services');

const createNote = catchAsync(async (req, res) => {
  const note = await noteService.createNote(req.body);
  res.status(httpStatus.CREATED).send(note);
});

const getNotes = catchAsync(async (req, res) => {
  // const result = await noteService.queryNotes();
  // res.send(result);
  const result = await noteService.queryAllNotesByOwnerId(req.query.id);
  res.send(result);
});

const getNote = catchAsync(async (req, res) => {
  const note = await noteService.getNoteById(req.params.Id);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  res.send(note);
});

const updateNote = catchAsync(async (req, res) => {
  const note = await noteService.updateNoteById(req.params.Id, req.body);
  res.send(note);
});

const deleteNote = catchAsync(async (req, res) => {
  await noteService.deleteNoteById(req.params.Id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
