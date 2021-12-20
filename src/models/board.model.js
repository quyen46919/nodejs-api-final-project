const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const boardSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
    },
    title: {
      type: String,
    },
    columnOrder: {
      type: Array,
    },
    // columns: {
    //   type: Array,
    // },
    lastUpdated: {
      type: Date,
    },
    isFavorite: {
      type: Boolean,
    },
    sharedUserList: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
boardSchema.plugin(toJSON);
boardSchema.plugin(paginate);

/**
 * @typedef User
 */
const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
