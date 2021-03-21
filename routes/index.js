/* eslint-disable no-use-before-define */
const express = require('express');

const router = express.Router();

const products = require('../data/products.json');

router.get('/__test', function (req, res) {
  res.send('Hello World');
});

router.post('/category/:name', (req, res) => {
  const filterCriteria = req.body;
  const category = req.params.name;
  const response = {};
  let data = products.filter((product) => product.category === category);
  // console.log(filterCriteria);
  if (filterCriteria.isFilter) {
    data = data.filter((product) => {
      return (
        (filterCriteria.price.length < 2 ||
          (product.currentPrice >= filterCriteria.price[0] && product.currentPrice <= filterCriteria.price[1])) &&
        (filterCriteria.rating.length === 0 || filterCriteria.rating.includes(`${product.rating}`)) &&
        (filterCriteria.brands.length === 0 || filterCriteria.brands.includes(product.brand))
      );
    });
    response.data = data;
    response.filter = null;
  } else {
    const filter = {};
    const prices = data.map((product) => product.currentPrice);
    const brands = [];
    data.forEach((product) => {
      if (!brands.includes(product.brand)) {
        brands.push(product.brand);
      }
    });
    filter.brands = brands;
    filter.price = [Math.min(...prices), Math.max(...prices)];
    response.filter = filter;
    response.data = data;
  }
  res.send(response);
});

router.get('/product/:id', (req, res) => {
  const { id } = req.params;
  const data = products.filter((product) => product.id === id);
  res.send(data);
});

router.post('/cart', (req, res) => {
  const cartItems = req.body;
  const results = products.filter((product) => cartItems.includes(product.id));
  res.send(results);
});

router.post('/order-history', (req, res) => {
  const cartItems = req.body;
  const results = products.filter((product) => cartItems.includes(product.id));
  const resultUpdated = results.map((product) => {
    // eslint-disable-next-line no-param-reassign
    product.orderDate = randomTime(new Date('01-10-2019 10:30'), new Date('01-10-2021 02:10'));
    return product;
  });
  res.send(resultUpdated);
});

router.post('/wishlist', (req, res) => {
  const cartItems = req.body;
  const results = products.filter((product) => cartItems.includes(product.id));
  const response = {
    data: results,
  };
  res.send(response);
});

function randomTime(start, end) {
  const diff = end.getTime() - start.getTime();
  const newDiff = diff * Math.random();
  const date = new Date(start.getTime() + newDiff);
  return date;
}

module.exports = router;
