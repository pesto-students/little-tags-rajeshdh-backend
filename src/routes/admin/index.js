const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const orderRoute = require('./order.route');
const categoryRoute = require('./category.route');
const imageRoute = require('./image.route');

const catchAsync = require('../../utils/catchAsync');

const { getUserCount } = require('../../controllers/user.controller');
const { getCategoryCount } = require('../../controllers/admin/category.controller');
const { getProductCount } = require('../../controllers/product.controller');

const router = express.Router();

router.get(
  '/',
  catchAsync(async (req, res) => {
    const userCount = await getUserCount();
    const productCount = await getProductCount();
    const categoryCount = await getCategoryCount();
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
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/images',
    route: imageRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
