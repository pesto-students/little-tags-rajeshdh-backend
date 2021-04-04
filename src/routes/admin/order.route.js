const express = require('express');

const { getOrders, createOrder, updateOrder, deleteOrder } = require('../../controllers/admin/order.controller');
const { getOrderById } = require('../../services/order.service');

const router = express.Router();

router.get('/', getOrders);

router.get('/create', (req, res) => {
  res.render('orders/create');
});

router.post('/create', createOrder);

router.get('/update/:id', async (req, res) => {
  const order = await getOrderById(req.params.id);
  res.render('orders/update', order);
});

router.post('/update/:id', updateOrder);

router.post('/delete/:id', deleteOrder);

module.exports = router;
