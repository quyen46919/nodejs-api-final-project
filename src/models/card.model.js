const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const cardSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  columnId: {
    type: String,
    required: true,
  },
  boardId: {
    type: String,
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
});

// add plugin that converts mongoose to json
cardSchema.plugin(toJSON);
cardSchema.plugin(paginate);

cardSchema.statics.isTitleTaken = async function (title, excludeId) {
  const card = await this.findOne({ title, _id: { $ne: excludeId } });
  return !!card;
};

/**
 * @typedef Card
 */
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
