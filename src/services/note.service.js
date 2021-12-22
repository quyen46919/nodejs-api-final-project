const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Note } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a note
 * @param {Object} noteBody
 * @returns {Promise<Note>}
 */
const createNote = async (noteBody) => {
  return Note.create(noteBody);
};

// /**
//  * Query for notes
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
const queryNotes = async () => {
  const notes = await Note.find();
  return notes;
};

/**
 * Get note by id
 * @param {ObjectId} id
 * @returns {Promise<Note>}
 */
const getNoteById = async (id) => {
  return Note.findById(id);
};

/**
 * Get note by email
 * @param {string} title
 * @returns {Promise<Note>}
 */
const getNoteByTitle = async (title) => {
  return Note.findOne({ title });
};

const queryAllNotesByOwnerId = async (ownerId) => {
  const notes = await Note.find({ owner: mongoose.Types.ObjectId(ownerId) });
  return notes;
};

/**
 * Update note by id
 * @param {ObjectId} Id
 * @param {Object} updateBody
 * @returns {Promise<Note>}
 */
const updateNoteById = async (Id, updateBody) => {
  const note = await getNoteById(Id);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  if (updateBody.title && (await Note.isTitleTaken(updateBody.title, Id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }
  Object.assign(note, updateBody);
  await note.save();
  return note;
};

/**
 * Delete note by id
 * @param {ObjectId} Id
 * @returns {Promise<Note>}
 */
const deleteNoteById = async (Id) => {
  const note = await getNoteById(Id);
  if (!note) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
  }
  await note.remove();
  return note;
};

module.exports = {
  createNote,
  queryNotes,
  queryAllNotesByOwnerId,
  getNoteById,
  getNoteByTitle,
  updateNoteById,
  deleteNoteById,
};
