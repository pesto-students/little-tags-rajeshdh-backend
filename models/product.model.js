import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image:  {
    type: String,
    required: true
  },
  brand:  {
    type: String,
    required: true
  },
  description:  {
    type: String,
    required: true
  },
  rating: Number,
  noOfReview: Number,
  stock: Number,
  features: [
    {
      type:  {
        type: String,
        required: true
      },
      value: [String],
    },
  ],
  gallery: [
    {
      title:  {
        type: String,
        required: true
      },
      image:  {
        type: String,
        required: true
      },
    },
  ],
  originalPrice: Number,
  currentPrice: Number,
  offer: Number,
  currency: {
    type: String,
    enum: [
     'INR','USD'
    ],
    default: 'INR'
  },
  category: {
    name: {
      type: String,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  }
});

module.exports = mongoose.model("Product", ProductSchema);
