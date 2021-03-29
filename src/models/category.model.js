const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;

const CategorySchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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

CategorySchema.statics.isCategoryTaken = async function (name, excludeUserId) {
  const category = await this.findOne({ name, _id: { $ne: excludeUserId } });
  return !!category;
};

module.exports = mongoose.model('Category', CategorySchema);
