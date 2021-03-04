var express = require('express');
var router = express.Router();

const products = require('../data/products.json')


router.get('/__test', function (req, res, next) {
  res.send("Hello World")
});

router.get('/category/:name', (req, res) => {
  const category = req.params.name
  const result = products.filter(product => product.category === category)
  res.send(result);
});

module.exports = router;
