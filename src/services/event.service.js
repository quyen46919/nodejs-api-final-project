const httpStatus = require('http-status');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a event
 * @param {Object} eventBody
 * @returns {Promise<Event>}
 */
const createEvent = async (eventBody) => {
  return Event.create(eventBody);
};

// /**
//  * Query for events
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
const queryEvents = async () => {
  const events = await Event.find();
  return events;
};

/**
 * Get event by id
 * @param {ObjectId} id
 * @returns {Promise<Event>}
 */
const getEventById = async (id) => {
  return Event.findById(id);
};

/**
 * Get event by email
 * @param {string} title
 * @returns {Promise<Event>}
 */
const getEventByTitle = async (title) => {
  return Event.findOne({ title });
};

/**
 * Update event by id
 * @param {ObjectId} Id
 * @param {Object} updateBody
 * @returns {Promise<Event>}
 */
const updateEventById = async (Id, updateBody) => {
  const event = await getEventById(Id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  if (updateBody.title && (await Event.isTitleTaken(updateBody.title, Id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title already taken');
  }
  Object.assign(event, updateBody);
  await event.save();
  return event;
};

/**
 * Delete event by id
 * @param {ObjectId} Id
 * @returns {Promise<Event>}
 */
const deleteEventById = async (Id) => {
  const event = await getEventById(Id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  await event.remove();
  return event;
};

module.exports = {
  createEvent,
  queryEvents,
  getEventById,
  getEventByTitle,
  updateEventById,
  deleteEventById,
};
