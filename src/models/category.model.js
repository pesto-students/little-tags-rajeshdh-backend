const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;

const CategorySchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.plugin(toJSON);
CategorySchema.plugin(paginate);

module.exports = mongoose.model('Category', CategorySchema);
