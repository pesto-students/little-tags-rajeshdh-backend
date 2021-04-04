const queryString = require('querystring');

const { orderService } = require('../../services');
const catchAsync = require('../../utils/catchAsync');
const pick = require('../../utils/pick');

const orderDetails = (req) => {
  const filter = pick(req.query, ['title', 'brand']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  return orderService.queryOrders(filter, options);
};

const getOrders = catchAsync(async (req, res) => {
  const result = await orderDetails(req);

  const queries = { ...req.query };
  res.render('orders/index', { ...result, ...queries });
});

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);
  let query = '';
  if (order) {
    query = queryString.stringify({
      error: false,
      message: 'Order Created',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/orders?${query}`);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.id, req.body);
  let query = '';
  if (order) {
    query = queryString.stringify({
      error: false,
      message: 'Order Updated',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/orders?${query}`);
});

const deleteOrder = catchAsync(async (req, res) => {
  const order = await orderService.deleteOrderById(req.params.id);
  let query = '';
  if (order) {
    query = queryString.stringify({
      error: false,
      message: 'Order Deleted',
    });
  } else {
    query = queryString.stringify({
      error: true,
      message: 'An error occurred',
    });
  }
  res.redirect(`/admin/orders?${query}`);
});

const getOrderCount = () => orderService.getOrderCount();

module.exports = {
  getOrderCount,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
