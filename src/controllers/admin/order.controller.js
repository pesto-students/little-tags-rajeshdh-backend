const queryString = require('querystring');
const httpStatus = require('http-status');
const { orderService } = require('../../services');
const ApiError = require('../../utils/ApiError');
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

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const getOrderProductStats = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['start', 'end']);
  filter.start = filter.start ? new Date(filter.start) : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();
  filter.end = filter.end ? new Date(filter.end) : new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString();

  const result = await orderService.getOrderProductStats(filter);

  res.send(result);
});

const getTotalOrderPrice = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['start', 'end']);
  filter.start = filter.start ? new Date(filter.start) : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();
  filter.end = filter.end ? new Date(filter.end) : new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString();

  const result = await orderService.getTotalOrderPrice(filter);

  res.send(result);
});

const getOrderCustomers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['start', 'end']);
  filter.start = filter.start ? new Date(filter.start) : new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();
  filter.end = filter.end ? new Date(filter.end) : new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString();

  const result = await orderService.getOrderCustomers(filter);

  res.send(result);
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
  getOrderProductStats,
  getOrder,
  getTotalOrderPrice,
  getOrderCustomers,
};
