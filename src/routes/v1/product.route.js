const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router.route('/').get(validate(productValidation.getProducts), productController.getProducts);

router.route('/:productId').get(validate(productValidation.getProduct), productController.getProduct);

module.exports = router;
