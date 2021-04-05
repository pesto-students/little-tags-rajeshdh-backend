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

CategorySchema.statics.isCategoryTaken = async function (title, excludeUserId) {
  const category = await this.findOne({ title, _id: { $ne: excludeUserId } });
  return !!category;
};

module.exports = mongoose.model('Category', CategorySchema);
