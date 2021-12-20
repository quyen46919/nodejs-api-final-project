const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const noteSchema = mongoose.Schema({
  ownerId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  // images
  cover: {
    type: String,
  },
  progress: {
    type: Number,
    max: 100,
    min: 0,
  },
});

// add plugin that converts mongoose to json
noteSchema.plugin(toJSON);
noteSchema.plugin(paginate);

noteSchema.statics.isTitleTaken = async function (title, excludeId) {
  const note = await this.findOne({ title, _id: { $ne: excludeId } });
  return !!note;
};
/**
 * @typedef Note
 */
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
