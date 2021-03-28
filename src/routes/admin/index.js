const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const productRoute = require('./products.route');

const catchAsync = require('../../utils/catchAsync');

const userModel = require('../../models/user.model');
const productModel = require('../../models/product.model');
const categoryModel = require('../../models/category.model');

const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res) => {
    const userCount = await userModel.countDocuments({ role: 'user' });
    const productCount = await productModel.estimatedDocumentCount();
    const categoryCount = await categoryModel.estimatedDocumentCount();
    const data = {
      userCount,
      productCount,
      categoryCount,
    };

    res.render('dashboard/index', data);
  })
);

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
