const express = require('express');

const { getProducts, createProduct, updateProduct, deleteProduct } = require('../../controllers/admin/product.controller');
const { getProductById } = require('../../services/product.service');

const router = express.Router();

router.get('/', getProducts);

router.get('/create', (req, res) => {
  res.render('products/create');
});

router.post('/create', createProduct);

router.get('/update/:id', async (req, res) => {
  const product = await getProductById(req.params.id);
  res.render('products/update', product);
});

router.post('/update/:id', updateProduct);

router.post('/delete/:id', deleteProduct);

module.exports = router;
