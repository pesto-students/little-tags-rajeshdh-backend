const faker = require('faker');
const mongoose = require('mongoose');
const { Product, Category, Order } = require('./models');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const randomInteger = (min, max) => {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
};

const getCategories = async () => {
  const categories = await Category.find().sort({ createdAt: -1 }).exec();

  return categories;
};

getCategories().then((categories) => {
  categories.forEach((category) => {
    const products = Array(randomInteger(1, 10))
      .fill()
      .map((i) => {
        const product = new Product({
          title: faker.commerce.product(),
          image: faker.datatype.string(),
          brand: faker.company.companyName(),
          description: faker.commerce.productDescription(),
          rating: faker.datatype.number(10),
          noOfReview: faker.datatype.number(1000),
          stock: faker.datatype.number(50),
          colors: [faker.internet.color(), faker.internet.color(), faker.internet.color()],
          originalPrice: faker.commerce.price(10000),
          currentPrice: faker.commerce.price(10000),
          offer: faker.datatype.number(50),
          discount: faker.datatype.number(50),
          currency: 'INR',
          category: { _id: category._id },
        });
        product.save();
        return product;
      });

    const statusArr = ['active', 'processing', 'complete'];
    const users = ['60584586fbf7a40790e61a30', '605845028d8d5006df45b153', '605861dc1c88bd1d277bf555'];
    const orders = Array(randomInteger(4, 10))
      .fill()
      .map(() => {
        const order = new Order({
          status: statusArr[faker.datatype.number(2)],
          modifiedOn: faker.date.past(),
          products: Array(randomInteger(1, products.length))
            .fill()
            .map((s, i) => {
              return {
                productId: products[i]._id,
                quantity: faker.datatype.number(5),
                name: products[i].title,
                price: products[i].currentPrice,
              };
            }),
          user: { _id: users[faker.datatype.number(2)] },
          shippingAddress: {
            fullName: faker.name.findName(),
            mobileNumber: faker.phone.phoneNumber(),
            address: faker.address.streetAddress(),
            state: faker.address.state(),
            city: faker.address.city(),
            pin: faker.datatype.number(999999),
          },
          paymentMethod: faker.datatype.string(),
          paymentResult: {
            id: faker.datatype.uuid(),
            status: 'done',
            update_time: faker.date.recent(),
            email_address: faker.internet.email(),
          },
          shippingPrice: faker.datatype.number(500),
          totalPrice: faker.datatype.number(10000),
          isPaid: faker.datatype.boolean(),
          paidAt: faker.date.recent(),
          isDelivered: faker.datatype.boolean(),
          deliveredAt: faker.date.recent(),
        });
        order.save();
        return order;
      });

    console.log('Process completed');
  });
});
