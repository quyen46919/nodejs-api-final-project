const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send(event);
});

const getEvents = catchAsync(async (req, res) => {
  const result = await eventService.queryEvents();
  res.send(result);
});

const getEvent = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.Id);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  res.send(event);
});

const updateEvent = catchAsync(async (req, res) => {
  const event = await eventService.updateEventById(req.params.Id, req.body);
  res.send(event);
});

const deleteEvent = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.Id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
