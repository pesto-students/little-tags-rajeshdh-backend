const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  const order = await Order.create(orderBody);
  return order;
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const populateOption = { ...options, populate: 'product,user' };
  const orders = await Order.paginate(filter, populateOption);
  return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return Order.findById(id);
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
};

const getOrderCount = () => Order.estimatedDocumentCount();

const getOrderProductStats = async (filter) => {
  const stats = await Order.aggregate()
    .match({ modifiedOn: { $gte: filter.start, $lt: filter.end } })
    .unwind('products')
    .group({
      _id: '$products.name',
      count: {
        $sum: 1,
      },
    })
    .sort('-count');
  return stats;
};
const getTotalOrderPrice = async (filter) => {
  const stats = await Order.aggregate()
    .match({ modifiedOn: { $gte: filter.start, $lt: filter.end } })
    .group({
      _id: null,
      order_totalPrice: { $sum: '$totalPrice' },
      count: { $sum: 1 },
    })
    .sort('-count');
  return stats;
};

const getOrderCustomers = async (filter) => {
  const stats = await Order.aggregate()
    .match({ modifiedOn: { $gte: filter.start, $lt: filter.end } })
    .lookup({ from: 'users', localField: 'user', foreignField: '_id', as: 'users' })
    .group({
      _id: {
        user: '$user',
        name: '$users.name',
      },
      count: {
        $sum: 1,
      },
    })
    .sort('-count');
  return stats;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrderCount,
  getOrderProductStats,
  getOrderCustomers,
  getTotalOrderPrice,
};
