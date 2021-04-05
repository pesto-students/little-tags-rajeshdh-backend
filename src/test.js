const mongoose = require('mongoose');
const { Order } = require('./models');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const month = {
  start: new Date(y, m, 1),
  end: new Date(y, m + 1, 0),
};
const year = {
  start: new Date(y, 1, 1),
  end: new Date(y, 12, 31),
};
const day = {
  start: new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
  end: new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString(),
};

// Order.aggregate(
//   [
//     { $match: { modifiedOn: { $gte: year.start, $lt: year.end } } },
//     { $unwind: '$products' },
//     {
//       $group: {
//         _id: {
//           product: '$products.productId',
//           name: '$products.name',
//         },
//         count: {
//           $sum: 1,
//         },
//       },
//     },
//     {
//       $sort: {
//         count: -1,
//       },
//     },
//   ],
//   (err, obj) => {
//     console.log(err);
//     console.log(obj);
//   }
// );
// // total price of all orders
// Order.aggregate(
//   [
//     {
//       $group: {
//         _id: null,
//         order_totalPrice: { $sum: '$totalPrice' },
//         count: { $sum: 1 },
//       },
//     },
//   ],
//   (err, obj) => {
//     console.log(err);
//     console.log(obj);
//   }
// );

// users who ordered

Order.aggregate(
  [
    {
      $group: {
        _id: {
          user: '$user',
          name: '$user.name',
        },
        count: {
          $sum: 1,
        },
      },
    },
  ],
  (err, obj) => {
    console.log(err);
    console.log(obj);
  }
);
