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
      default: 'Thư mục chưa đặt tên',
    },
    columnOrder: {
      type: Array,
      default: [],
    },
    lastUpdated: {
      type: Date,
      default: new Date(),
    },
    isFavorite: {
      type: Boolean,
    },
    sharedUserList: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

boardSchema.pre('update', function (next) {
  this.update({}, { $inc: { __v: 1 } }, next);
});

// add plugin that converts mongoose to json
boardSchema.plugin(toJSON);
boardSchema.plugin(paginate);

/**
 * @typedef User
 */
const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
