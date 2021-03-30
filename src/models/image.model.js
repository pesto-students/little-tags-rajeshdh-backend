const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const imageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      maxlength: [200, 'Max length allowed for an image URL is 200 characters.'],
      validate: {
        validator: validator.isURL,
        message: 'Please provide a valid image URL.',
      },
    },
  },
  {
    timestamps: true,
  }
);

imageSchema.plugin(toJSON);
imageSchema.plugin(paginate);
/**
 * @typedef Image
 */
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
