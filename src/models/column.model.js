const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const columnSchema = mongoose.Schema(
  {
    boardId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    isFavorite: {
      type: Boolean,
    },
    columnOrder: {
      type: Array,
    },
    cardOrder: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
columnSchema.plugin(toJSON);
columnSchema.plugin(paginate);

/**
 * @typedef Column
 */
const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
