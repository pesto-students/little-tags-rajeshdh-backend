const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('products/index');
});

router.get('/create', (req, res) => {
  res.render('products/create');
});

// router.post('/login', login);
module.exports = router;
