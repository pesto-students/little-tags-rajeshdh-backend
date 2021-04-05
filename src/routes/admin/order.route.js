const express = require('express');

const { orderController } = require('../../controllers/admin');

const router = express.Router();

router.get('/', orderController.getOrders);

router.get('/create', (req, res) => {
  res.render('orders/create');
});

router.post('/create', orderController.createOrder);

router.get('/update/:orderId', async (req, res) => {
  const order = orderController.getOrder(req);
  res.render('orders/update', order);
});

router.post('/update/:id', orderController.updateOrder);

router.post('/delete/:id', orderController.deleteOrder);

router.get('/stats', async (req, res) => {
  res.render('orders/stats');
});

router.get('/productstats', orderController.getOrderProductStats);
router.get('/customerstats', orderController.getOrderCustomers);
router.get('/orderstats', orderController.getTotalOrderPrice);

module.exports = router;
