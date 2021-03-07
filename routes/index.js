var express = require('express');
var router = express.Router();

const products = require('../data/products.json')


router.get('/__test', function (req, res, next) {
  res.send("Hello World")
});

router.get('/category/:name', (req, res) => {
  const filterCriteria = req.body
  const category = req.params.name
  const response = {}
  let data = products.filter(product => product.category === category)
  console.log(filterCriteria);
  if (filterCriteria.isFilter) {
    data = data.filter(product => {
      return (filterCriteria.price.length < 2 || (product.currentPrice >= filterCriteria.price[0] && product.currentPrice <= filterCriteria.price[1])) &&
        (filterCriteria.rating.length === 0 || (filterCriteria.rating.includes('' + product.rating))) &&
        (filterCriteria.brands.length === 0 || (filterCriteria.brands.includes(product.brand)))
    })
    response.data = data
    response.filter = null
  } else {
    const filter = {}
    const prices = data.map(product => product.currentPrice)
    const brands = []
    data.forEach(product => {
      if (!brands.includes(product.brand)) {
        brands.push(product.brand)
      }
    })
    filter.brands = brands
    filter.price = [Math.min(...prices), Math.max(...prices)]
    response.filter = filter
    response.data = data
  }
  res.send(response);
});

router.get('/product/:id', (req, res) => { 
  const id = req.params.id
  let data = products.filter(product => product.id === id)
  res.send(data);
})


module.exports = router;
