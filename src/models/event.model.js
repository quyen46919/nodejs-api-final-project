const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const eventSchema = mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  title: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  color: {
    type: String,
  },
});

// add plugin that converts mongoose to json
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);

eventSchema.statics.isTitleTaken = async function (title, excludeId) {
  const event = await this.findOne({ title, _id: { $ne: excludeId } });
  return !!event;
};
/**
 * @typedef Event
 */
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
