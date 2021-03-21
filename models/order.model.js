const mongoose = require("mongoose");
const { toJSON, paginate } = require('./plugins');
const { Schema } = mongoose;

const OrderSchema = Schema({
  status: {
    type: String,
    required: true,
    enum: ["active", "processing", "complete"],
  },
  modifiedOn: { type: Date, default: Date.now },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      name: String,
      price: Number,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  shippingAddress: {
    id: 1,
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pin: { type: Number, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
},
{
  timestamps: true,
});

OrderSchema.plugin(toJSON);
OrderSchema.plugin(paginate);

module.exports = mongoose.model(" Order", OrderSchema);
